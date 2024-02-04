import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {saveUser} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";

export const useSaveUserLanguageParams = () => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSave = (nativeLanguage, studiedLanguage): void => {
        setIsLoading(true);
        const updatedUser = {
            userUid: user.userUid,
            email: user.email,
            nativeLanguage: nativeLanguage,
            languageToLearn: studiedLanguage.code,
            trainingCardsList: user.trainingCardsList,
            numberOfCards: user.numberOfCards,
            languages: user.languages
        }
        saveUser(updatedUser).then(() => {
            dispatch(setUser(updatedUser));
            notification.emit("success", 'The user data got saved.');
            setIsLoading(false);
        }).catch(error => {
            console.error('error saveUser Settings', error);
            notification.emit("error", "The user data couldn't get saved.");
            setIsLoading(false);
        });
    };

    return {isLoading, handleSave};
};
