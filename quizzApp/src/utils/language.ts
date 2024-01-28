import {v4 as uuidv4} from 'uuid';
import {createLanguage} from "@Utils/firebaseConfig";

export const createNewLanguage = (languageToLearn: string) => {
    const languageData = {
        languageUid: uuidv4(),
        languageName: languageToLearn
    };
    return createLanguage(languageData);
};
