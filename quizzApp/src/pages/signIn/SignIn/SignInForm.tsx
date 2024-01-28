import React from "react";
import styled from "styled-components";
import update from "immutability-helper";

import {InputCustom} from "@Components/InputCustom";
import {InputsWrapper} from "@Components/layout";

import {SignInData} from "@Pages/signIn/SignIn";

interface Props {
    signInData: SignInData;
    setSignInData: (value: SignInData) => void;
}

export const SignInForm: React.FC<Props> = (props) => {

    return (
        <SignInFormWrapper>
            <InputsWrapper>
                <InputCustom
                    label={'Email address'}
                    value={props.signInData.email}
                    setValue={e => props.setSignInData(update(props.signInData, {
                        email: {
                            $set: e
                        }
                    }))}
                />
                <InputCustom
                    label={'Password'}
                    value={props.signInData.password}
                    setValue={e => props.setSignInData(update(props.signInData, {
                        password: {
                            $set: e
                        }
                    }))}
                    type={"password"}
                />
            </InputsWrapper>
        </SignInFormWrapper>
    )
}

const SignInFormWrapper = styled.div`

`;
