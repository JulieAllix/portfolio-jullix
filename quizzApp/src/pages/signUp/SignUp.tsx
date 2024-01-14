import React, {useState} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";
import {ContentWrapper, InputsWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";

import {createLanguage, registerWithEmailAndPassword, saveUser} from "@Utils/firebaseConfig";
import {notification} from "@Utils/events";

interface SignUpData {
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignUp = () => {
        if (!signUpData.email) {
            notification.emit("error", "Please indicate your e-mail address.");
        } else if (!signUpData.password) {
            notification.emit("error", "Please indicate a password.");
        } else if (!signUpData.nativeLanguage) {
            notification.emit("error", "Please indicate your native language");
        } else if (!signUpData.languageToLearn) {
            notification.emit("error", "Please indicate a studied language");
        } else {
            setIsLoading(true);

            const newLanguageUid = uuidv4();
            const languageData = {
                languageUid: newLanguageUid,
                languageName: signUpData.languageToLearn
            };

            createLanguage(languageData).then(() => {
                registerWithEmailAndPassword(signUpData.email, signUpData.password).then(createdUser => {
                    saveUser({
                        userUid: createdUser.user.uid,
                        email: signUpData.email,
                        nativeLanguage: signUpData.nativeLanguage,
                        languageToLearn: signUpData.languageToLearn,
                        trainingCardsList: [],
                        numberOfCards: 0,
                        languages: [newLanguageUid],
                    }).then(() => {
                        notification.emit("success", "Your account successfully got created.");
                        setIsLoading(false);
                    }).catch(error => {
                        console.error('error saveUser', error);
                        notification.emit("error", "Your account couldn't get created.");
                        setIsLoading(false);
                    });
                }).catch(error => {
                    console.error('error registerWithEmailAndPassword', error);
                    setIsLoading(false);
                    if (error.code === "auth/email-already-in-use") {
                        notification.emit("error", "An account already exists for this e-mail address.");
                    } else if (error.code === "auth/weak-password") {
                        notification.emit("error", "Your password should contain at least 6 characters.");
                    } else {
                        notification.emit("error", "Your account creation failed.");
                    };
                });
            }).catch(error => {
                console.error('error createLanguage', error);
                setIsLoading(false);
            });
        };
    };

    return (
        <SignUpWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
            </TitleWrapper>
            <ContentWrapper>
                <InputsWrapper>
                    <InputCustom
                        label={'E-mail address'}
                        value={signUpData.email}
                        setValue={e => setSignUpData(update(signUpData, {
                            email: {
                                $set: e
                            }
                        }))}
                    />
                    <InputCustom
                        label={'Password'}
                        value={signUpData.password}
                        setValue={e => setSignUpData(update(signUpData, {
                            password: {
                                $set: e
                            }
                        }))}
                        type={"password"}
                    />
                    <InputCustom
                        label={'Native language'}
                        value={signUpData.nativeLanguage}
                        setValue={e => setSignUpData(update(signUpData, {
                            nativeLanguage: {
                                $set: e
                            }
                        }))}
                    />
                    <InputCustom
                        label={'Studied language'}
                        value={signUpData.languageToLearn}
                        setValue={e => setSignUpData(update(signUpData, {
                            languageToLearn: {
                                $set: e
                            }
                        }))}
                    />
                </InputsWrapper>
                <ButtonCustom isLoading={isLoading} onClick={handleSignUp}>Sign up</ButtonCustom>
                <LinkWrapper onClick={() => history.push("/sign-in")}><Link>Sign in</Link></LinkWrapper>
            </ContentWrapper>
        </SignUpWrapper>
    )
}

const SignUpWrapper = styled.div`
  display: flex;
  height: var(--app-height);
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
