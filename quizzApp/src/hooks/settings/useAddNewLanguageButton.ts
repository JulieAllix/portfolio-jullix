import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";

import {createLanguage, getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {ERROR_SAVING_TRAINING_CARDS_MESSAGE} from "@Models/errorMessagesQuizzApp";
import {User} from "@Models/types/bases/quizzApp/User";

export const useAddNewLanguageButton = (newLanguageName: string, setIsAddModalOpen: (value: boolean) => void, setNewLanguageName: (value: string) => void) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const newLanguageUid = uuidv4();
    const languageData = {
        languageUid: newLanguageUid,
        languageName: newLanguageName
    }

    const handleAddNewLanguageClick = async () => {
        setIsLoading(true);
        await addLanguageToDataBase();
        await addLanguageToUserData();
        updateUserState();
    };

    const addLanguageToDataBase = async () => {
        try {
            createLanguage(languageData)
        } catch (error) {
            handleCreateLanguageError(error);
        }
    };

    const handleCreateLanguageError = (error): void => {
        console.error("error createLanguage", error);
        notification.emit("error", ERROR_SAVING_TRAINING_CARDS_MESSAGE);
        resetInitialState();
    };

    const resetInitialState = (): void => {
        setIsAddModalOpen(false);
        setIsLoading(false);
        setNewLanguageName('');
    };

    const addLanguageToUserData = async () => {
        try {
            const updatedUserData = getUpdatedUserData();
            saveUser(updatedUserData)
        } catch (error) {
            handleSaveUserError(error);
        }
    };

    const getUpdatedUserData = (): User => {
        const updatedLanguages = [...user.languages];
        updatedLanguages.push(newLanguageUid);
        const updatedUserData = {
            ...user,
            languages: updatedLanguages
        };

        return updatedUserData;
    };

    const handleSaveUserError = (error): void => {
        console.error("error saveUser", error);
        notification.emit("error", ERROR_SAVING_TRAINING_CARDS_MESSAGE);
        resetInitialState();
    };

    const updateUserState = (): void => {
        getUserFirebaseData(user.userUid).then(userData => {
            notification.emit("success", 'The new language got saved.');
            resetInitialState();
            dispatch(setUser(userData));
        }).catch(error => {
            console.error("error getUserFirebaseData useAddNewLanguageButton", error);
            setIsLoading(false);
        })
    };

    return {handleAddNewLanguageClick, isLoading}
}
