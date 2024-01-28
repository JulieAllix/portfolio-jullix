

export interface ErrorsData {
    message: string;
};

export type ErrorsType = "email" | "password" | "nativeLanguage" | "languageToLearn"

export const useCheckErrors = (dataToCheck: Map<ErrorsType, any>) => {


    const checkErrors = (): ErrorsData[] => {
        const newErrors:ErrorsData[] = []

        if (dataToCheck) {
            if (dataToCheck.has("email")) {
                if (!dataToCheck.get("email")) {
                    newErrors.push({message: "Please indicate your e-mail address."})
                }
            };

            if (dataToCheck.has("password")) {
                if (!dataToCheck.get("password")) {
                    newErrors.push({message: "Please indicate a password."})
                }
            };

            if (dataToCheck.has("nativeLanguage")) {
                if (!dataToCheck.get("nativeLanguage")) {
                    newErrors.push({message: "Please indicate your native language."})
                }
            };

            if (dataToCheck.has("languageToLearn")) {
                if (!dataToCheck.get("languageToLearn")) {
                    newErrors.push({message: "Please indicate a studied language."})
                }
            };

            return newErrors;
        } else return null
    };

    return {checkErrors}
};
