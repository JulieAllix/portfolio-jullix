import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";

import {getUserFirebaseData, loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {User} from "@Models/types/bases/quizzApp/User";
import {setUser} from "@Utils/redux/reducers/user";
import {ContentWrapper, InputsWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";
import {useHistory} from "react-router";

interface Props {

}

export const SignIn: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = () => {
        setIsLoading(true);
        loginWithEmailAndPassword(email, password).then(response => {
            console.log('response loginWithEmailAndPassword', response);
            if (response.user !== null) {
                getUserdata(response);
            }
        }).catch(error => {
            console.error('error loginWithEmailAndPassword', error);
            setIsLoading(false);
        });
    };

    const getUserdata = (response: any): void => {
        getUserFirebaseData(response.user!.uid).then((__response: User) => {
            if (__response !== undefined) {
                dispatch(setUser(__response));
                setIsLoading(false);
            } else {
                // TODO : feedback d'erreur: Ce compte n'existe pas.
                setIsLoading(false);
            };
        }).catch(error => {
            console.error('error getUserFirebaseData', error);
            setIsLoading(false);
        });
    };

    return (
        <SignInWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
                <Subtitle>The app that helps you studying your vocabulary</Subtitle>
            </TitleWrapper>
            <Welcome>Welcome back !</Welcome>
            <ContentWrapper>
                <InputsWrapper>
                    <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                    <InputCustom label={'Password'} value={password} setValue={setPassword}/>
                </InputsWrapper>
                <ButtonCustom isLoading={isLoading} onClick={handleSignIn}>Sign in</ButtonCustom>
                <LinkWrapper onClick={() => history.push("/sign-up")}><Link>Sign up</Link></LinkWrapper>
            </ContentWrapper>
        </SignInWrapper>
    )
}

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

const Welcome = styled.div`
  font-size: 24px;
  font-family: Poppins;
  font-style: normal;
  color: white;
  text-align: center;
  font-weight: 800;
  margin-bottom: 12px;
`;
