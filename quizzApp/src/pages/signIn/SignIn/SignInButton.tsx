import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useSignInButton} from "@Hooks/signIn/useSignInButton";
import {SignInData} from "@Pages/signIn/SignIn";

interface Props {
    signInData: SignInData;
}

export const SignInButton: React.FC<Props> = (props) => {
    const { isLoading, handleClick } = useSignInButton(props.signInData);

    return (
        <ButtonCustom isLoading={isLoading} onClick={handleClick}>Sign in</ButtonCustom>
    );
};
