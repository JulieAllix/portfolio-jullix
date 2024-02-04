import React, {useContext, useEffect, useState} from "react";
import update from "immutability-helper";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {InputCustom} from "@Components/InputCustom";
import {Card, CardTitle, Subtitle} from "@Components/layout";

import {State} from "@Utils/redux/store";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {QuizzContext} from "@Hooks/context/QuizzContext";

interface Props {

}

export const QuizzCardInputs: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const {languageToLearnData} = useFetchLanguageToLearn();
    const {quizzCardData, setQuizzCardData} = useContext(QuizzContext);
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (quizzCardData.languageToLearnValue === null && quizzCardData.nativeLanguageValue === null) {
            setKey(key+1)
        }
    }, [quizzCardData]);

    return (
        <QuizzCardInputsWrapper>
            <Card>
                <CardTitle>{user.nativeLanguage} word</CardTitle>
                <Subtitle>Add a word in your mother tongue.</Subtitle>
                <InputCustom
                    key={key}
                    value={quizzCardData.nativeLanguageValue}
                    setValue={e => setQuizzCardData(update(quizzCardData, {
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
                    key={key}
                    value={quizzCardData.languageToLearnValue}
                    setValue={e => setQuizzCardData(update(quizzCardData, {
                        languageToLearnValue: {
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
