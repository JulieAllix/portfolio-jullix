import {useSelector} from "react-redux";

import {State} from "@Utils/redux/store";
import {useEffect, useState} from "react";
import {getLanguageByUid} from "@Utils/firebaseConfig";
import {Language} from "@Models/types/bases/quizzApp/Language";

export const useFetchLanguageToLearn = () => {
    const user = useSelector((state: State) => state.user);
    const [languageToLearnData, setLanguageToLearnData] = useState<Language>(null);

    useEffect(() => {
        if (user) {
            getLanguageByUid(user.languageToLearn).then(_language => {
                setLanguageToLearnData(_language);
            }).catch(error => console.error('error getLanguagesOfUser', error));
        };
    }, [user]);

    return {languageToLearnData};
};
