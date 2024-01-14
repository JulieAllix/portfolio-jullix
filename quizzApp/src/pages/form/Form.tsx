import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import update from "immutability-helper";

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";
import {Card, CardsWrapper, CardTitle, Instruction, Subtitle} from "@Components/layout";

import {notification} from "@Utils/events";
import {setUser} from "@Utils/redux/reducers/user";
import {createCard, getLanguageByUid, getRandomNumberId, getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {Language} from "@Models/types/bases/quizzApp/Language";

interface FormData {
    nativeLanguageValue: string;
    languageToLearnValue: string;
}

interface Props {

}

export const Form: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [formdata, setFormData] = useState<FormData>({
        nativeLanguageValue: "",
        languageToLearnValue: "",
    });
    const [languageToLearnData, setLanguageToLearnData] = useState<Language>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getLanguageByUid(user.languageToLearn).then(_language => {
            setLanguageToLearnData(_language);
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, [user]);

    const handleSend = () => {
        if (formdata.nativeLanguageValue === '') {
            notification.emit('error', `Please enter the ${user.nativeLanguage} word.`);
        } else if (formdata.languageToLearnValue === '') {
            notification.emit('error', `Please enter the ${languageToLearnData.languageName} translation.`);
        } else {
            setIsLoading(true);
            const cardData = {
                userUid: user.userUid,
                cardUid: getRandomNumberId(),
                nativeLanguageValue: formdata.nativeLanguageValue,
                languageToLearnValue: formdata.languageToLearnValue,
                languageUid: languageToLearnData ? languageToLearnData.languageUid : "",
            }
            createCard(cardData).then(response => {
                notification.emit('success', 'Your card has been successfully added to the database !');
                setFormData({nativeLanguageValue: "", languageToLearnValue: ""})

                const updatedTrainingCardsList = [...user.trainingCardsList];
                updatedTrainingCardsList.push(cardData.cardUid);

                const updatedUser = {
                    ...user,
                    numberOfCards: user.numberOfCards + 1,
                    trainingCardsList: updatedTrainingCardsList
                };
                saveUser(updatedUser).then(() => {
                    getUserFirebaseData(user.userUid).then(userData => {
                        dispatch(setUser(userData));
                        setIsLoading(false);
                    }).catch(error => {
                        console.error("error getUserFirebaseData Form", error);
                        setIsLoading(false);
                    })
                }).catch(error => {
                    console.error("error saveUser Form", error);
                    setIsLoading(false);
                });
            }).catch(error => {
                console.log('error createSpanishData', error);
                notification.emit('error', "Your card couldn't get added to the database.");
                setIsLoading(false);
            });
        }
    };

    return (
        <FormWrapper>
            <ContentWrapper>
                <Instruction width={"70%"}>New quizz card</Instruction>
                <CardsWrapper padding={"0 0 20px 0"} style={{height: `${window.innerHeight*0.8}px`}}>
                    <Card>
                        <CardTitle>{user.nativeLanguage} word</CardTitle>
                        <Subtitle>Add a word in your mother tongue.</Subtitle>
                        <InputCustom
                            value={formdata.nativeLanguageValue}
                            setValue={e => setFormData(update(formdata, {
                                nativeLanguageValue: {
                                    $set: e
                                }
                            }))}
                        />
                    </Card>
                    <Card>
                        <CardTitle>{languageToLearnData ? languageToLearnData.languageName : ""} translation</CardTitle>
                        <Subtitle>Add a word in your mother tongue.</Subtitle>
                        <InputCustom
                            value={formdata.nativeLanguageValue}
                            setValue={e => setFormData(update(formdata, {
                                nativeLanguageValue: {
                                    $set: e
                                }
                            }))}
                        />
                    </Card>
                    <ButtonCustom isLoading={isLoading} onClick={handleSend} color={"white"}>Save</ButtonCustom>
                </CardsWrapper>
            </ContentWrapper>
        </FormWrapper>
    )
}

const FormWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
