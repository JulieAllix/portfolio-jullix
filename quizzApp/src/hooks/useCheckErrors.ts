
export interface ErrorsData {
    message: string;
};

export type ErrorsType = "email" | "password" | "nativeLanguage" | "languageToLearn";

type DataToCheck = {
    email: string,
    password: string,
    nativeLanguage?: string,
    languageToLearn?: string;
}

export const useCheckErrors = (dataToCheck: DataToCheck) => {
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

    const checkErrors = (): ErrorsData[] => {
        const newErrors:ErrorsData[] = []

        if (dataToCheck) {
            if (dataToCheckMap.has("email")) {
                if (!dataToCheckMap.get("email")) {
                    newErrors.push({message: "Please indicate your email address."})
                }
            };

            if (dataToCheckMap.has("password")) {
                if (!dataToCheckMap.get("password")) {
                    newErrors.push({message: "Please indicate a password."})
                }
            };

            if (dataToCheckMap.has("nativeLanguage")) {
                if (!dataToCheckMap.get("nativeLanguage")) {
                    newErrors.push({message: "Please indicate your native language."})
                }
            };

            if (dataToCheckMap.has("languageToLearn")) {
                if (!dataToCheckMap.get("languageToLearn")) {
                    newErrors.push({message: "Please indicate a studied language."})
                }
            };

            return newErrors;
        } else return null
    };

    return {checkErrors}
};
