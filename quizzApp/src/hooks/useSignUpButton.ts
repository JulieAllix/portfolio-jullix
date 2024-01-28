import {SignUpData} from "@Pages/signUp/SignUp";
import {useCheckErrors} from "@Hooks/useCheckErrors";
import {useState} from "react";
import {handleSignUp} from "@Utils/signUp";
import {notification} from "@Utils/events";

export const useSignUpButton = (signUpData: SignUpData) => {
    const { checkErrors } = useCheckErrors(signUpData);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initiateSignUp = (signUpData: SignUpData) => {
        return handleSignUp(
            signUpData.languageToLearn,
            signUpData.nativeLanguage,
            signUpData.email,
            signUpData.password
        );
    };

    const handleSignUpClick = (): void => {
        if (checkErrors().length > 0) {
            checkErrors().forEach((error) => {
                notification.emit("error", error.message);
            });
        } else {
            setIsLoading(true);
            initiateSignUp(signUpData)
                .then((feedback) => {
                    notification.emit(feedback.feedbackType, feedback.feedbackMessage);
                })
                .catch((error) => {
                    console.error("Error handleSignUp", error);
                    notification.emit("error", "Your account couldn't get created.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    return {
        isLoading,
        handleClick: handleSignUpClick,
    };
};
