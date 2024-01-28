import React from "react";
import update from "immutability-helper";
import styled from "styled-components";

import {InputCustom} from "@Components/InputCustom";
import {InputsWrapper} from "@Components/layout";

import {SignUpData} from "@Pages/signUp/SignUp";

interface Props {
    signUpData: SignUpData;
    setSignUpData: (data: SignUpData) => void;
}

export const SignUpForm: React.FC<Props> = (props) => {

    return (
        <SignUpFormWrapper>
            <InputsWrapper>
                <InputCustom
                    label={'Email address'}
                    value={props.signUpData.email}
                    setValue={e => props.setSignUpData(update(props.signUpData, {
                        email: {
                            $set: e
                        }
                    }))}
                />
                <InputCustom
                    label={'Password'}
                    value={props.signUpData.password}
                    setValue={e => props.setSignUpData(update(props.signUpData, {
                        password: {
                            $set: e
                        }
                    }))}
                    type={"password"}
                />
                <InputCustom
                    label={'Native language'}
                    value={props.signUpData.nativeLanguage}
                    setValue={e => props.setSignUpData(update(props.signUpData, {
                        nativeLanguage: {
                            $set: e
                        }
                    }))}
                />
                <InputCustom
                    label={'Studied language'}
                    value={props.signUpData.languageToLearn}
                    setValue={e => props.setSignUpData(update(props.signUpData, {
                        languageToLearn: {
                            $set: e
                        }
                    }))}
                />
            </InputsWrapper>
        </SignUpFormWrapper>
    )
}

const SignUpFormWrapper = styled.div`

`;
