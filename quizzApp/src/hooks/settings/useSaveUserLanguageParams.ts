import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {ERROR_SAVING_USER_MESSAGE} from "@Models/errorMessagesQuizzApp";
import {User} from "@Models/types/bases/quizzApp/User";

export const useSaveUserLanguageParams = () => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSaveUserLanguageParams = async (nativeLanguage: string, studiedLanguageData: {name: string, code: string}): Promise<void> => {
        setIsLoading(true);
        await updateUserInDataBase(nativeLanguage, studiedLanguageData);
        updateUserState();
    };

    const updateUserInDataBase = async (nativeLanguage: string, studiedLanguageData: {name: string, code: string}) => {
        try {
            const updatedUser: User = {
                ...user,
                nativeLanguage: nativeLanguage,
                languageToLearn: studiedLanguageData.code,
            }
            saveUser(updatedUser)
        } catch (error) {
            console.error('error saveUser Settings', error);
            notification.emit("error", ERROR_SAVING_USER_MESSAGE);
            setIsLoading(false);
        }
    }

    const updateUserState = (): void => {
        getUserFirebaseData(user.userUid).then(userData => {
            notification.emit("success", 'The user data got saved.');
            setIsLoading(false);
            dispatch(setUser(userData));
        }).catch(error => {
            console.error("error getUserFirebaseData useAddNewLanguageButton", error);
            setIsLoading(false);
        })
    };

    return {isLoading, handleSaveUserLanguageParams};
};
