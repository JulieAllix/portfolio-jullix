import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";

import {createLanguage, saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";

export const useAddNewLanguageButton = (newLanguageName: string, setIsAddModalOpen: (value: boolean) => void, setNewLanguageName: (value: string) => void) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
        setIsLoading(true);
        const newLanguageUid = uuidv4();
        const languageData = {
            languageUid: newLanguageUid,
            languageName: newLanguageName
        }
        createLanguage(languageData).then(() => {
            const updatedLanguages = [...user.languages];
            updatedLanguages.push(newLanguageUid);

            const updatedUserData = {
                ...user,
                languages: updatedLanguages
            };

            saveUser(updatedUserData).then(newUserData => {
                dispatch(setUser(newUserData));
                setIsAddModalOpen(false);
                notification.emit("success", 'The new language got saved.');
                setIsLoading(false);
                setNewLanguageName('');
            }).catch(error => {
                console.error("error createLanguage", error);
                setIsAddModalOpen(false);
                notification.emit("error", "The new language couldn't get saved.");
                setIsLoading(false);
                setNewLanguageName('');
            });
        }).catch(error => {
            console.error("error createLanguage", error);
            setIsAddModalOpen(false);
            notification.emit("error", "The new language couldn't get saved.");
            setIsLoading(false);
            setNewLanguageName('');
        })
    };

    return {handleClick, isLoading}
}
