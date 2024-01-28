import {createNewLanguage} from "@Utils/language";
import {registerWithEmailAndPassword, saveUser} from "@Utils/firebaseConfig";

export const handleSignUp = async (languageToLearn: string, nativeLanguage: string, email: string, password: string): Promise<{feedbackType: "success"|"error", feedbackMessage: string}> => {
    try {
        const newLanguageUid = await createNewLanguage(languageToLearn);
        const createdUser = await registerWithEmailAndPassword(email, password);
        await saveUser({
            userUid: createdUser.user.uid,
            email: email,
            nativeLanguage: nativeLanguage,
            languageToLearn: languageToLearn,
            trainingCardsList: [],
            numberOfCards: 0,
            languages: [newLanguageUid],
        });

        return {feedbackType: "success", feedbackMessage: "Your account successfully got created."};
    } catch (error) {
        console.error("error handleSignUp", error)
        return {feedbackType: "error", feedbackMessage: error.message};
    };
};
