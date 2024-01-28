import {useSelector} from "react-redux";
import {State} from "@Utils/redux/store";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";

export interface ErrorsData {
    message: string;
};

export type ErrorsType = "email" | "password" | "nativeLanguage" | "languageToLearn";

type DataToCheck = {
    email?: string,
    password?: string,
    nativeLanguage?: string,
    languageToLearn?: string;
    nativeLanguageValue?: string;
    languageToLearnValue?: string;
}

export const useCheckErrors = (dataToCheck: DataToCheck) => {
    const user = useSelector((state: State) => state.user);
    const {languageToLearnData} = useFetchLanguageToLearn();
    const dataToCheckMap = new Map();

    if (dataToCheck.email) {
        dataToCheckMap.set("email", dataToCheck.email);
    };
    if (dataToCheck.password) {
        dataToCheckMap.set("password", dataToCheck.password);
    };
    if (dataToCheck.nativeLanguage) {
        dataToCheckMap.set("nativeLanguage", dataToCheck.nativeLanguage);
    };
    if (dataToCheck.languageToLearn) {
        dataToCheckMap.set("languageToLearn", dataToCheck.languageToLearn);
    };
    if (dataToCheck.nativeLanguageValue) {
        dataToCheckMap.set("nativeLanguageValue", dataToCheck.nativeLanguageValue);
    };
    if (dataToCheck.languageToLearnValue) {
        dataToCheckMap.set("languageToLearnValue", dataToCheck.languageToLearnValue);
    };
    console.log("dataToCheck", dataToCheck)
    console.log("dataToCheckMap", dataToCheckMap)
    const checkErrors = (): ErrorsData[] => {
        const newErrors:ErrorsData[] = []

        if (dataToCheck) {
            if (dataToCheckMap.has("email")) {
                if (!dataToCheckMap.get("email")) {
                    newErrors.push({message: "Please indicate your email address."});
                }
            };

            if (dataToCheckMap.has("password")) {
                if (!dataToCheckMap.get("password")) {
                    newErrors.push({message: "Please indicate a password."});
                }
            };

            if (dataToCheckMap.has("nativeLanguage")) {
                if (!dataToCheckMap.get("nativeLanguage")) {
                    newErrors.push({message: "Please indicate your native language."});
                }
            };

            if (dataToCheckMap.has("languageToLearn")) {
                if (!dataToCheckMap.get("languageToLearn")) {
                    newErrors.push({message: "Please indicate a studied language."});
                }
            };
            console.log("dataToCheckMap.has(nativeLanguageValue)", dataToCheckMap.get("nativeLanguageValue"))
            if (dataToCheckMap.has("nativeLanguageValue")) {
                console.log("get", dataToCheckMap.get("nativeLanguageValue"))
                if (!dataToCheckMap.get("nativeLanguageValue")) {
                    newErrors.push({message: `Please enter the ${user.nativeLanguage} word.`});
                }
            };

            if (dataToCheckMap.has("languageToLearnValue")) {
                if (!dataToCheckMap.get("languageToLearnValue")) {
                    newErrors.push({message: `Please enter the ${languageToLearnData.languageName} translation.`});
                }
            };


            return newErrors;
        } else return null
    };

    return {checkErrors}
};
