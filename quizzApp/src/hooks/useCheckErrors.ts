import {useSelector} from "react-redux";
import {State} from "@Utils/redux/store";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";

export interface ErrorsData {
    message: string;
};

export type ErrorsType = "email" | "password" | "nativeLanguage" | "languageToLearn" | "numberOfQuestionsToPick";

type DataToCheck = {
    email?: string,
    password?: string,
    nativeLanguage?: string,
    languageToLearn?: string;
    nativeLanguageValue?: string;
    languageToLearnValue?: string;
    numberOfQuestionsToPick?: number;
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
    if (dataToCheck.numberOfQuestionsToPick || dataToCheck.numberOfQuestionsToPick === 0) {
        dataToCheckMap.set("numberOfQuestionsToPick", dataToCheck.numberOfQuestionsToPick);
    };
    //console.log("dataToCheck", dataToCheck)
    //console.log("dataToCheckMap", dataToCheckMap)
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

            if (dataToCheckMap.has("nativeLanguageValue")) {
                if (!dataToCheckMap.get("nativeLanguageValue")) {
                    newErrors.push({message: `Please enter the ${user.nativeLanguage} word.`});
                }
            };

            if (dataToCheckMap.has("languageToLearnValue")) {
                if (!dataToCheckMap.get("languageToLearnValue")) {
                    newErrors.push({message: `Please enter the ${languageToLearnData.languageName} translation.`});
                }
            };

            if (dataToCheckMap.has("numberOfQuestionsToPick")) {
                if (dataToCheckMap.get("numberOfQuestionsToPick") <= 0) {
                    newErrors.push({message: `Please define a number of questions higher than 0.`});
                }
            };

            return newErrors;
        } else return null
    };

    return {checkErrors}
};
