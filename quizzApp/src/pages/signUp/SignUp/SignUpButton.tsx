import React from "react";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";

import {SignUpData} from "@Pages/signUp/SignUp";
import {useSignUpButton} from "@Hooks/useSignUpButton";

interface Props {
    signUpData: SignUpData;
}

export const SignUpButton: React.FC<Props> = (props) => {
    const { isLoading, handleClick } = useSignUpButton(props.signUpData);

    return (
        <SignUpButtonWrapper>
            <ButtonCustom isLoading={isLoading} onClick={handleClick}>Sign up</ButtonCustom>
        </SignUpButtonWrapper>
    )
}

const SignUpButtonWrapper = styled.div`

`;
