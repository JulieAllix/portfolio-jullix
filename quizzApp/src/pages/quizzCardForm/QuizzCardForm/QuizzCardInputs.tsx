import React from "react";
import update from "immutability-helper";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {InputCustom} from "@Components/InputCustom";
import {Card, CardTitle, Subtitle} from "@Components/layout";

import {State} from "@Utils/redux/store";
import {QuizzCardData} from "@Pages/quizzCardForm/QuizzCardForm";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";

interface Props {
    quizzCardData: QuizzCardData;
    setQuizzCardData: (value: QuizzCardData) => void;
}

export const QuizzCardInputs: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const {languageToLearnData} = useFetchLanguageToLearn();

    return (
        <QuizzCardInputsWrapper>
            <Card>
                <CardTitle>{user.nativeLanguage} word</CardTitle>
                <Subtitle>Add a word in your mother tongue.</Subtitle>
                <InputCustom
                    value={props.quizzCardData.nativeLanguageValue}
                    setValue={e => props.setQuizzCardData(update(props.quizzCardData, {
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
                    value={props.quizzCardData.nativeLanguageValue}
                    setValue={e => props.setQuizzCardData(update(props.quizzCardData, {
                        nativeLanguageValue: {
                            $set: e
                        }
                    }))}
                />
            </Card>
        </QuizzCardInputsWrapper>
    )
}

const QuizzCardInputsWrapper = styled.div`

`;
