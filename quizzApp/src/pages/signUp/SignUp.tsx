import React, {useState} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";

import {SignUpButton} from "@Pages/signUp/SignUp/SignUpButton";
import {SignUpForm} from "@Pages/signUp/SignUp/SignUpForm";
import {ContentWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";

export interface SignUpData {
    email: string,
    password: string,
    nativeLanguage: string,
    languageToLearn: string;
}

interface Props {

}

export const SignUp: React.FC<Props> = (props) => {
    const history = useHistory();

    const [signUpData, setSignUpData] = useState<SignUpData>({
        email: null,
        password: null,
        nativeLanguage: null,
        languageToLearn: null,
    });

    return (
        <SignUpWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
            </TitleWrapper>
            <ContentWrapper>
                <SignUpForm signUpData={signUpData} setSignUpData={setSignUpData}/>
                <SignUpButton signUpData={signUpData}/>
                <LinkWrapper onClick={() => history.push("/sign-in")}><Link>Sign in</Link></LinkWrapper>
            </ContentWrapper>
        </SignUpWrapper>
    )
};

const SignUpWrapper = styled.div`
  display: flex;
  height: var(--app-height);
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
