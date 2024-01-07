import React, {useState} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";
import {ContentWrapper, InputsWrapper, Link, LinkWrapper, Title, TitleWrapper} from "@Components/layout";
import {createLanguage, registerWithEmailAndPassword, saveUser} from "@Utils/firebaseConfig";
import {ModalCustom} from "@Components/ModalCustom";

interface Props {

}

export const SignUp: React.FC<Props> = (props) => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nativeLanguage, setNativeLanguage] = useState<string>('');
    const [studiedLanguage, setStudiedLanguage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignUp = () => {
        setIsLoading(true);
        const newLanguageUid = uuidv4();
        const languageData = {
            languageUid: newLanguageUid,
            languageName: studiedLanguage
        }
        createLanguage(languageData).then(() => {
            registerWithEmailAndPassword(email, password).then(createdUser => {
                saveUser({
                    userUid: createdUser.user.uid,
                    email: email,
                    nativeLanguage: nativeLanguage,
                    languageToLearn: studiedLanguage,
                    trainingCardsList: [],
                    numberOfCards: 0,
                    languages: [newLanguageUid],
                }).then(() => {
                    setIsModalOpen(true);
                    setModalContent({title: 'Success', body: "Your account successfully got created."});
                    setIsLoading(false);
                }).catch(error => {
                    console.log('error saveUser', error);
                    setIsModalOpen(true);
                    setModalContent({title: 'Error', body: "Your account couldn't get created."});
                    setIsLoading(false);
                });
            }).catch(error => {
                console.log('error registerWithEmailAndPassword', error);
                setIsModalOpen(true);
                setIsLoading(false);
                if (error.code === "auth/email-already-in-use") {
                    setModalContent({title: 'Error', body: "An account already exists for this e-mail address."});
                } else if (error.code === "auth/weak-password") {
                    setModalContent({title: 'Error', body: "Your password should contain at least 6 characters."});
                } else {
                    setModalContent({title: 'Error', body: "Your account creation failed."});
                }
            });
        }).catch(error => console.log('error createLanguage', error));
    };

    return (
        <SignUpWrapper>
            <TitleWrapper>
                <Title>Quizz App</Title>
            </TitleWrapper>
            <ContentWrapper>
                <InputsWrapper>
                    <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                    <InputCustom label={'Password'} value={password} setValue={setPassword}/>
                    <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                    <InputCustom label={'Studied language'} value={studiedLanguage} setValue={setStudiedLanguage}/>
                </InputsWrapper>
                <ButtonCustom isLoading={isLoading} onClick={handleSignUp}>Sign up</ButtonCustom>
                <LinkWrapper onClick={() => history.push("/sign-in")}><Link>Sign in</Link></LinkWrapper>
            </ContentWrapper>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
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
