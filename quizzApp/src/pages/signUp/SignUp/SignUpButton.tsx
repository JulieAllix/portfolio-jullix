import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useSignUpButton} from "@Hooks/useSignUpButton";
import {SignUpData} from "@Pages/signUp/SignUp";

interface Props {
    signUpData: SignUpData;
}

export const SignUpButton: React.FC<Props> = (props) => {
    const { isLoading, handleClick } = useSignUpButton(props.signUpData);

    return (
        <ButtonCustom isLoading={isLoading} onClick={handleClick}>Sign up</ButtonCustom>
    )
};
