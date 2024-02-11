import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {User} from "@Models/types/bases/quizzApp/User";
import {QuizzContext} from "@Hooks/context/QuizzContext";

export const useFailedButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const {currentQuizzCardsList} = useContext(QuizzContext);

    const [isLoadingFailedButton, setIsLoadingFailedButton] = useState<boolean>(false);

    const handleFailedClick = (cardIndex: number): void => {
        setIsLoadingFailedButton(true);
        updateUserData(cardIndex);
    };

    const updateUserData = (cardIndex: number) => {
        const updatedUserData = addFailedCardToUsersTrainingCardsList(cardIndex);
        saveUser(updatedUserData).then(updateCurrentUserData).catch(handleSaveUserError);
    };

    const addFailedCardToUsersTrainingCardsList = (index: number): User => {
        const updatedTrainingCardsList = getTrainingCardsListUpdatedWithNewFailedCard(index);
        return {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        };
    };

    const getTrainingCardsListUpdatedWithNewFailedCard = (index: number): number[] => {
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(currentQuizzCardsList[index].cardUid);
        return updatedTrainingCardsList;
    };

    const updateCurrentUserData = (): void => {
        getUserFirebaseData(user.userUid).then(_user => {
            dispatch(setUser(_user));
            notification.emit("success", "This card got added to your training cards list !");
            setIsLoadingFailedButton(false);
        });
    };

    const handleSaveUserError = (error: Error): void => {
        notification.emit("error", "This card couldn't be added to your training cards list.");
        console.error("error saveUser : ", error);
        setIsLoadingFailedButton(false);
    };

    return {
        isLoadingFailedButton,
        handleFailedClick: handleFailedClick,
    };
};
