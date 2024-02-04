import {useState} from "react";
import {useDispatch} from "react-redux";

import {useCheckErrors} from "@Hooks/useCheckErrors";
import {getUserFirebaseData, loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {SignInData} from "@Pages/signIn/SignIn";
import {User} from "@Models/types/bases/quizzApp/User";
import {notification} from "@Utils/events";
import {setUser} from "@Utils/redux/reducers/user";

export const useSignInButton = (signInData: SignInData) => {
    const dispatch = useDispatch();
    const { checkErrors } = useCheckErrors(signInData);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUserdata = (response: any): void => {
        getUserFirebaseData(response.user!.uid).then((__response: User) => {
            if (__response !== undefined) {
                dispatch(setUser(__response));
                setIsLoading(false);
            } else {
                notification.emit("error", "There is no data for this account.");
                setIsLoading(false);
            };
        }).catch(error => {
            console.error('error getUserFirebaseData', error);
            setIsLoading(false);
            notification.emit("error", "There is no data for this account.");
        });
    };

    const handleSignInClick = (): void => {
        if (checkErrors().length > 0) {
            checkErrors().forEach((error) => {
                notification.emit("error", error.message);
            });
        } else {
            setIsLoading(true);
            loginWithEmailAndPassword(signInData.email, signInData.password).then(response => {
                if (response.user !== null) {
                    getUserdata(response);
                };
            }).catch(error => {
                console.error('error loginWithEmailAndPassword', error);
                setIsLoading(false);
                handleLoginError(error);
            });
        };
    };

    const handleLoginError = (error: any): void => {
        if (error.code === "auth/invalid-email") {
            notification.emit("error", "No account exists with that email address.");
        } else if (error.code === "auth/internal-error") {
            notification.emit("error", "Check your password and your email.");
        } else {
            notification.emit("error", error.message);
        };
    };

    return {
        isLoading,
        handleClick: handleSignInClick,
    };
}
