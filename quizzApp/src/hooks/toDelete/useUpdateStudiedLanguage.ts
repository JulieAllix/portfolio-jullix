import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {useFetchLanguages} from "@Hooks/useFetchLanguagesData";
import {State} from "@Utils/redux/store";

export const useUpdateStudiedLanguage = () => {
    const user = useSelector((state: State) => state.user);
    const {languagesdata} = useFetchLanguages();

    const [studiedLanguage, setStudiedLanguage] = useState<{name: string, code: string}>(null);

    useEffect(() => {
        if (languagesdata) {
            const languageToLearnData = languagesdata.find(languageItem => languageItem.code === user.languageToLearn);
            setStudiedLanguage(languageToLearnData);
        }
    }, [user.languageToLearn, languagesdata]);

    return {studiedLanguage, setStudiedLanguage};
};
