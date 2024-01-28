import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {useFetchLanguagesData} from "@Hooks/useFetchLanguagesData";
import {State} from "@Utils/redux/store";

export const useUpdateStudiedLanguage = () => {
    const user = useSelector((state: State) => state.user);
    const {languagesdata} = useFetchLanguagesData();

    const [studiedLanguage, setStudiedLanguage] = useState<{name: string, code: string}>(null);

    useEffect(() => {
        if (languagesdata) {
            const languageToLearnData = languagesdata.find(languageItem => languageItem.code === user.languageToLearn);
            setStudiedLanguage(languageToLearnData);
        }
    }, [user.languageToLearn, languagesdata]);

    return {studiedLanguage, setStudiedLanguage};
};
