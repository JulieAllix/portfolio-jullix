import React from "react";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputNumberCustom} from "@Components/InputNumberCustom";
import {Card, CardTitle, Subtitle} from "@Components/layout";

import {useStartRandomQuizzButton} from "@Hooks/quizz/useStartRandomQuizzButton";

interface Props {
    numberOfQuestionsToPick: number;
    setNumberOfQuestionsToPick: (value: number) => void;
}

export const RandomQuizzCard: React.FC<Props> = (props) => {
    const { isLoading, handleClick } = useStartRandomQuizzButton(props.numberOfQuestionsToPick);

    return (
        <RandomQuizzCardWrapper>
            <Card>
                <CardTitle>Random quizz</CardTitle>
                <Subtitle>Choose the number of questions to pick randomly from your database.</Subtitle>
                <InputNumberCustom label={'Number of questions'} value={props.numberOfQuestionsToPick} setValue={props.setNumberOfQuestionsToPick}/>
                <ButtonCustom onClick={handleClick} isLoading={isLoading}>Start</ButtonCustom>
            </Card>
        </RandomQuizzCardWrapper>
    )
}

const RandomQuizzCardWrapper = styled.div`

`;
