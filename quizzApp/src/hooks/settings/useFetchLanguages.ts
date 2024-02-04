import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {getLanguagesOfUser} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";

export const useFetchLanguages = () => {
    const user = useSelector((state: State) => state.user);

    const [languagesdata, setLanguagesdata] = useState<{name: string, code: string}[]>(null);

    useEffect(() => {
        getLanguagesOfUser(user).then(_languages => {
            const reformattedData = _languages.map(language => {
                return {
                    name: language.languageName,
                    code: language.languageUid
                }
            });
            setLanguagesdata(reformattedData);
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, [user.languages]);

    return {languagesdata};
};
