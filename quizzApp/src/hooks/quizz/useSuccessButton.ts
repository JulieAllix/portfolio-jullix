import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {QuizzContext} from "@Hooks/context/QuizzContext";

export const useSuccessButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const {currentQuizzCardsList} = useContext(QuizzContext);

    const [isLoadingSuccessButton, setIsLoadingSuccessButton] = useState<boolean>(false);

    const handleSuccessClick = (cardIndex: number): void => {
        setIsLoadingSuccessButton(true);
        updateUserData(cardIndex);
    };

    const updateUserData = (cardIndex: number) => {
        const updatedUserData = removeSuccessCardFromUsersTrainingCardsList(cardIndex);
        saveUser(updatedUserData).then(updateCurrentUserData).catch(handleSaveUserError);
    };

    const removeSuccessCardFromUsersTrainingCardsList = (cardIndex: number) => {
        const updatedTrainingCardsList = getTrainingCardsListUpdatedWithoutSuccessCard(cardIndex);
        return {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        };
    };

    const getTrainingCardsListUpdatedWithoutSuccessCard = (index: number): number[] => {
        const trainingCardsList = [...user.trainingCardsList];
        const updatedTrainingCardsList = trainingCardsList.filter(card => card !== currentQuizzCardsList[index].cardUid);
        return updatedTrainingCardsList;
    };

    const updateCurrentUserData = (): void => {
        getUserFirebaseData(user.userUid).then(_user => {
            dispatch(setUser(_user));
            notification.emit("success", "This card got removed from your training cards list !");
            setIsLoadingSuccessButton(false);
        })
    };

    const handleSaveUserError = (error: Error) => {
        notification.emit("error", "This card couldn't get removed from your training cards list.");
        console.error("error saveUser : ", error);
        setIsLoadingSuccessButton(false);
    };

    return {
        isLoadingSuccessButton,
        handleSuccessClick: handleSuccessClick,
    };
}
