import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {createCard, getRandomNumberId, getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";

import {useCheckErrors} from "@Hooks/useCheckErrors";
import {QuizzContext} from "@Hooks/context/QuizzContext";
import {CardData} from "@Models/types/bases/quizzApp/Form";
import {User} from "@Models/types/bases/quizzApp/User";
import {ERROR_SAVING_NEW_CARD_TO_DATABASE} from "@Models/errorMessagesQuizzApp";

export const useCreateNewQuizzCardButton = () => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();
    const {quizzCardData, setQuizzCardData} = useContext(QuizzContext);
    const { checkErrors } = useCheckErrors(quizzCardData);
    const {languageToLearnData} = useFetchLanguageToLearn();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const cardData: CardData = {
        userUid: user.userUid,
        cardUid: getRandomNumberId(),
        nativeLanguageValue: quizzCardData.nativeLanguageValue,
        languageToLearnValue: quizzCardData.languageToLearnValue,
        languageUid: languageToLearnData ? languageToLearnData.languageUid : "",
    };

    const handleCreateNewQuizzCardClick = async (): Promise<void> => {
        const errors = checkErrors();

        if (errors.length > 0) {
            errors.forEach((error) => {
                notification.emit("error", error.message);
            });
        } else {
            setIsLoading(true);
            await addCardToDataBase();
            resetInitialState();
            await addNewCardToUsersTrainingList();
            updateUserState();
        }
    }

    const addCardToDataBase = async () => {
        try {
            await createCard(cardData);
            notification.emit('success', 'Your card has been successfully added to the database !');
        } catch (error) {
            console.log('error createSpanishData', error);
            notification.emit('error', ERROR_SAVING_NEW_CARD_TO_DATABASE);
            setIsLoading(false);
        }
    };

    const resetInitialState = (): void => {
        setQuizzCardData({nativeLanguageValue: null, languageToLearnValue: null})
        setIsLoading(false);
    };

    const addNewCardToUsersTrainingList = async (): Promise<void> => {
        try {
            const updatedUser = getUpdatedUserData();
            saveUser(updatedUser)
        } catch (error) {
            console.error("error saveUser Form", error);
            setIsLoading(false);
        }
    };

    const getUpdatedUserData = (): User => {
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(cardData.cardUid);
        const updatedUser = {
            ...user,
            numberOfCards: user.numberOfCards + 1,
            trainingCardsList: updatedTrainingCardsList
        };
        return updatedUser;
    };

    const updateUserState = (): void => {
        getUserFirebaseData(user.userUid).then(userData => {
            dispatch(setUser(userData));
            setIsLoading(false);
        }).catch(error => {
            console.error("error getUserFirebaseData Form", error);
            setIsLoading(false);
        })
    };

    return {handleCreateNewQuizzCardClick, isLoading}
}
