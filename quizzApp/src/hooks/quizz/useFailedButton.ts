import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {User} from "@Models/types/bases/quizzApp/User";

export const useFailedButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const cardsData = useSelector((state: State) => state.cardsData);

    const [isLoadingFailedButton, setIsLoadingFailedButton] = useState<boolean>(false);

    const getUpdatedUserData = (index: number): User => {
        const updatedTrainingCardsList = getTrainingCardsListUpdatedWithNewFailedCard(index);
        return {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        };
    };

    const getTrainingCardsListUpdatedWithNewFailedCard = (index: number): number[] => {
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(cardsData[index].cardUid);
        return updatedTrainingCardsList;
    };

    const updateCurrentUserData = (): void => {
        getUserFirebaseData(user.userUid).then(_user => {
            dispatch(setUser(_user));
            notification.emit("success", "This card got added to your training cards list !");
            setIsLoadingFailedButton(false);
        });
    };

    const handleClickOnFailed = (index: number): void => {
        setIsLoadingFailedButton(true);

        const updatedUserData = getUpdatedUserData(index);

        saveUser(updatedUserData).then(() => {
            updateCurrentUserData();
        }).catch(error => {
            notification.emit("error", "This card couldn't be added to your training cards list.");
            console.log("error saveUser : ", error)
            setIsLoadingFailedButton(false);
        });
    };

    return {
        isLoadingFailedButton,
        handleClickOnFailed: handleClickOnFailed,
    };
};
