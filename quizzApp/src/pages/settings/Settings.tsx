import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {motion} from "framer-motion";
import {v4 as uuidv4} from 'uuid';

import {ButtonCustom} from "@Components/ButtonCustom";
import {DropdownCustom} from "@Components/DropdownCustom";
import {InputCustom} from "@Components/InputCustom";
import {ModalCustom} from "@Components/ModalCustom";
import {Card, CardsWrapper, CardTitle, Instruction, Subtitle} from "@Components/layout";

import {State} from "@Utils/redux/store";
import {auth, createLanguage, getLanguagesOfUser, saveUser, signOut} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";

interface Props {

}

export const Settings: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [nativeLanguage, setNativeLanguage] = useState<string>(user.nativeLanguage);
    const [studiedLanguage, setStudiedLanguage] = useState<{name: string, code: string}>(null);
    const [languagesdata, setLanguagesdata] = useState<{name: string, code: string}[]>(null);
    const [newLanguage, setNewLanguage] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (languagesdata) {
            const languageToLearnData = languagesdata.find(languageItem => languageItem.code === user.languageToLearn);
            setStudiedLanguage(languageToLearnData)
        }
    }, [user.languageToLearn, languagesdata]);

    useEffect(() => {
        getLanguagesOfUser(user).then(_languages => {
            const reformattedData = _languages.map(language => {
                return {
                    name: language.languageName,
                    code: language.languageUid
                }
            });
            setLanguagesdata(reformattedData)
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, []);

    const handleSave = (): void => {
        setIsLoading(true);
        const updatedUser = {
            userUid: user.userUid,
            email: user.email,
            nativeLanguage: nativeLanguage,
            languageToLearn: studiedLanguage.code,
            trainingCardsList: user.trainingCardsList,
            numberOfCards: user.numberOfCards,
            languages: user.languages
        }
        saveUser(updatedUser).then(() => {
            dispatch(setUser(updatedUser));
            notification.emit("success", 'The user data got saved.');
            setIsLoading(false);
        }).catch(error => {
            console.error('error saveUser Settings', error);
            notification.emit("error", "The user data couldn't get saved.");
            setIsLoading(false);
        });
    };

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    const handleResetPassword = () => {
        auth.sendPasswordResetEmail(user.email).then(() => {
            notification.emit('success', `Un mail de réinitilisation de mot de passe a été envoyé à l'adresse : ${user?.email}`);
        });
    };

    const handleSaveNewLanguage = () => {
        setIsLoading(true);
        const newLanguageUid = uuidv4();
        const languageData = {
            languageUid: newLanguageUid,
            languageName: newLanguage
        }
        createLanguage(languageData).then(() => {
            const updatedLanguages = [...user.languages];
            updatedLanguages.push(newLanguageUid);

            const updatedUserData = {
                ...user,
                languages: updatedLanguages
            };

            saveUser(updatedUserData).then(newUserData => {
                dispatch(setUser(newUserData));
                setIsAddModalOpen(false);
                notification.emit("success", 'The new language got saved.');
                setIsLoading(false);
                setNewLanguage('');
            }).catch(error => {
                console.error("error createLanguage", error);
                setIsAddModalOpen(false);
                notification.emit("error", "The new language couldn't get saved.");
                setIsLoading(false);
                setNewLanguage('');
            });
        }).catch(error => {
            console.error("error createLanguage", error);
            setIsAddModalOpen(false);
            notification.emit("error", "The new language couldn't get saved.");
            setIsLoading(false);
            setNewLanguage('');
        })
    };

    return (
        <SettingsWrapper>
            <ContentWrapper>
                <Instruction width={"60%"}>Settings</Instruction>
                <CardsWrapper style={{height: `${window.innerHeight*0.75}px`}}>
                    <Card>
                        <CardTitle>Personal data</CardTitle>
                        <Subtitle>{user.email}</Subtitle>
                        <Subtitle><Accent>{user.numberOfCards}</Accent> cards created</Subtitle>
                        <ButtonCustom onClick={handleResetPassword}>Reset password</ButtonCustom>
                    </Card>
                    <Card>
                        <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                        <DropdownCustom
                            label={'Studied language'}
                            placeholder={""}
                            list={languagesdata}
                            selectedValue={studiedLanguage}
                            setSelectedValue={setStudiedLanguage}
                        />
                        <ButtonCustom onClick={handleSave} isLoading={isLoading}>Save</ButtonCustom>
                        <ButtonCustom onClick={() => setIsAddModalOpen(true)}>Add new language</ButtonCustom>
                    </Card>
                    <ButtonsWrapper>
                        <div style={{width: "10px"}}/>
                        <ButtonCustom onClick={handleSignOut} color={"white"}>Sign out</ButtonCustom>
                    </ButtonsWrapper>
                </CardsWrapper>
            </ContentWrapper>
            <ModalCustom visible={isAddModalOpen} setVisible={setIsAddModalOpen} title={"Add a new language"} buttonAction={handleSaveNewLanguage}>
                <InputCustom label={'New language'} value={newLanguage} setValue={setNewLanguage}/>
            </ModalCustom>
        </SettingsWrapper>
    )
}

const SettingsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const Accent = styled.span`
  col: var(--m-primary);
`;

const ButtonsWrapper = styled.div`

`;
