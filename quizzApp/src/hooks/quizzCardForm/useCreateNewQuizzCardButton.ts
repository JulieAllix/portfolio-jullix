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


export const useCreateNewQuizzCardButton = () => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();
    const {quizzCardData, setQuizzCardData} = useContext(QuizzContext);
    const { checkErrors } = useCheckErrors(quizzCardData);
    const {languageToLearnData} = useFetchLanguageToLearn();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
        console.log("checkErrors", checkErrors())
        if (checkErrors().length > 0) {
            checkErrors().forEach((error) => {
                notification.emit("error", error.message);
            });
        } else {
            setIsLoading(true);
            const cardData: CardData = {
                userUid: user.userUid,
                cardUid: getRandomNumberId(),
                nativeLanguageValue: quizzCardData.nativeLanguageValue,
                languageToLearnValue: quizzCardData.languageToLearnValue,
                languageUid: languageToLearnData ? languageToLearnData.languageUid : "",
            }
            createCard(cardData).then(response => {
                notification.emit('success', 'Your card has been successfully added to the database !');
                setQuizzCardData({nativeLanguageValue: null, languageToLearnValue: null})

                const updatedTrainingCardsList = [...user.trainingCardsList];
                updatedTrainingCardsList.push(cardData.cardUid);

                const updatedUser = {
                    ...user,
                    numberOfCards: user.numberOfCards + 1,
                    trainingCardsList: updatedTrainingCardsList
                };
                saveUser(updatedUser).then(() => {
                    getUserFirebaseData(user.userUid).then(userData => {
                        dispatch(setUser(userData));
                        setIsLoading(false);
                    }).catch(error => {
                        console.error("error getUserFirebaseData Form", error);
                        setIsLoading(false);
                    })
                }).catch(error => {
                    console.error("error saveUser Form", error);
                    setIsLoading(false);
                });
            }).catch(error => {
                console.log('error createSpanishData', error);
                notification.emit('error', "Your card couldn't get added to the database.");
                setIsLoading(false);
            });
        }
    }

    return {handleClick, isLoading}
}
