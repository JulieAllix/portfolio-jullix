import {useState} from "react";
import {useDispatch} from "react-redux";

import {SignInData} from "@Pages/signIn/SignIn";
import {User} from "@Models/types/bases/quizzApp/User";
import {ERROR_FETCHING_USER_MESSAGE, ERROR_INTERNAL, ERROR_INVALID_EMAIL} from "@Models/errorMessagesQuizzApp";
import {notification} from "@Utils/events";
import {setUser} from "@Utils/redux/reducers/user";
import {getUserFirebaseData, loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {useCheckErrors} from "@Hooks/useCheckErrors";

export const useSignInButton = (signInData: SignInData) => {
    const dispatch = useDispatch();
    const { checkErrors } = useCheckErrors(signInData);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignInClick = async (): Promise<void> => {
        if (checkErrors().length > 0) {
            checkErrors().forEach((error) => {
                notification.emit("error", error.message);
            });
        } else {
            setIsLoading(true);
            await handleLogin();
        };
    };

    const handleLogin = async (): Promise<void> => {
        try {
            loginWithEmailAndPassword(signInData.email, signInData.password).then(loginResponse => {
                updateUserState(loginResponse);
            })
        } catch (error) {
            console.error('error loginWithEmailAndPassword', error);
            setIsLoading(false);
            handleLoginError(error);
        }
    };

    const updateUserState = async (loginResponse: any): Promise<void> => {
        getUserFirebaseData(loginResponse.user!.uid).then((userResponse: User) => {
            setIsLoading(false);
            if (userResponse !== undefined) {
                dispatch(setUser(userResponse));
            } else {
                handleFetchUserError();
            };
        }).catch(error => {
            console.error('error getUserFirebaseData', error);
            handleFetchUserError();
        });
    };

    const handleFetchUserError = (): void => {
        notification.emit("error", ERROR_FETCHING_USER_MESSAGE);
        setIsLoading(false);
    };

    const handleLoginError = (error: any): void => {
        if (error.code === ERROR_INVALID_EMAIL) {
            notification.emit("error", "No account exists with that email address.");
        } else if (error.code === ERROR_INTERNAL) {
            notification.emit("error", "Check your password and your email.");
        } else {
            notification.emit("error", error.message);
        };
    };

    return {
        isLoading,
        handleSignInClick: handleSignInClick,
    };
}
