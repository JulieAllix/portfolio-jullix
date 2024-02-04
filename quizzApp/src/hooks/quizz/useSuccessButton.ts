import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {User} from "@Models/types/bases/quizzApp/User";

export const useSuccessButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const cardsData = useSelector((state: State) => state.cardsData);

    const [isLoadingSuccessButton, setIsLoadingSuccessButton] = useState<boolean>(false);

    const getUpdatedUserData = (index: number): User => {
        const updatedTrainingCardsList = getTrainingCardsListUpdatedWithoutSuccessCard(index);
        return {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        };
    };

    const getTrainingCardsListUpdatedWithoutSuccessCard = (index: number): number[] => {
        const trainingCardsList = [...user.trainingCardsList];
        const updatedTrainingCardsList = trainingCardsList.filter(card => card !== cardsData[index].cardUid);
        return updatedTrainingCardsList;
    };

    const updateCurrentUserData = (): void => {
        getUserFirebaseData(user.userUid).then(_user => {
            dispatch(setUser(_user));
            notification.emit("success", "This card got removed from your training cards list !");
            setIsLoadingSuccessButton(false);
        })
    };

    const handleClickOnSuccess = (index: number): void => {
        setIsLoadingSuccessButton(true);

        const updatedUserData = getUpdatedUserData(index);

        saveUser(updatedUserData).then(() => {
            getUserFirebaseData(user.userUid).then(_user => {
                updateCurrentUserData();
            })
        }).catch(error => {
            notification.emit("error", "This card couldn't get removed from your training cards list.");
            console.log("error saveUser : ", error);
            setIsLoadingSuccessButton(false);
        });
    };

    return {
        isLoadingSuccessButton,
        handleClickOnSuccess: handleClickOnSuccess,
    };
}
