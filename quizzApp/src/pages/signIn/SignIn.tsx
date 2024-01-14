import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import update from "immutability-helper";
import {useHistory} from "react-router";

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";
import {ContentWrapper, InputsWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";

import {getUserFirebaseData, loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {User} from "@Models/types/bases/quizzApp/User";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";

interface SignInData {
    email: string,
    password: string,
}

interface Props {

}

export const SignIn: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [signInData, setSignInData] = useState<SignInData>({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = () => {
        if (signInData.email === "") {
            notification.emit("error", "Please indicate your e-mail address.");
        } else if (signInData.password === "") {
            notification.emit("error", "Please indicate your password.");
        } else {
            setIsLoading(true);
            loginWithEmailAndPassword(signInData.email, signInData.password).then(response => {
                console.log('response loginWithEmailAndPassword', response);
                if (response.user !== null) {
                    getUserdata(response);
                }
            }).catch(error => {
                console.error('error loginWithEmailAndPassword', error);
                setIsLoading(false);
                if (error.code === "auth/invalid-email") {
                    notification.emit("error", "No account exists with that e-mail address.");
                } else {
                    notification.emit("error", "Check your password.");
                }
            });
        };
    };

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

    return (
        <SignInWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
                <Subtitle>The app that helps you studying your vocabulary</Subtitle>
            </TitleWrapper>
            <Welcome>Welcome back !</Welcome>
            <ContentWrapper>
                <InputsWrapper>
                    <InputCustom
                        label={'E-mail address'}
                        value={signInData.email}
                        setValue={e => setSignInData(update(signInData, {
                            email: {
                                $set: e
                            }
                        }))}
                    />
                    <InputCustom
                        label={'Password'}
                        value={signInData.password}
                        setValue={e => setSignInData(update(signInData, {
                            password: {
                                $set: e
                            }
                        }))}
                        type={"password"}
                    />
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
