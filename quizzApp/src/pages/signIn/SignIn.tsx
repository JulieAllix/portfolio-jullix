import React, {useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

import {SignInButton} from "@Pages/signIn/SignIn/SignInButton";
import {SignInForm} from "@Pages/signIn/SignIn/SignInForm";
import {ContentWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";

export interface SignInData {
    email: string,
    password: string,
}

interface Props {

}

export const SignIn: React.FC<Props> = (props) => {
    const history = useHistory();

    const [signInData, setSignInData] = useState<SignInData>({
        email: "",
        password: "",
    });

    return (
        <SignInWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
                <Subtitle>The app that helps you studying your vocabulary</Subtitle>
            </TitleWrapper>
            <WelcomeMessage>Welcome back !</WelcomeMessage>
            <ContentWrapper>
                <SignInForm signInData={signInData} setSignInData={setSignInData}/>
                <SignInButton signInData={signInData}/>
                <LinkWrapper onClick={() => history.push("/sign-up")}><Link>Sign up</Link></LinkWrapper>
            </ContentWrapper>
        </SignInWrapper>
    );
};

const SignInWrapper = styled.div`
  display: flex;
  height: var(--app-height);
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Subtitle = styled.div`
  font-size: 12px;
  font-family: Poppins;
  font-style: normal;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.div`
  font-size: 24px;
  font-family: Poppins;
  font-style: normal;
  color: white;
  text-align: center;
  font-weight: 800;
  margin-bottom: 12px;
`;
