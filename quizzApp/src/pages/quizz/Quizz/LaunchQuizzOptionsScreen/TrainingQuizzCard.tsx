import React from "react";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";
import {Card, CardTitle, Subtitle} from "@Components/layout";

import {useStartTrainingQuizzButton} from "@Hooks/quizz/useStartTrainingQuizzButton";

interface Props {

}

export const TrainingQuizzCard: React.FC<Props> = (props) => {
    const {handleClick, isLoading} = useStartTrainingQuizzButton();

    return (
        <TrainingQuizzCardWrapper>
            <Card>
                <CardTitle>Training quizz</CardTitle>
                <Subtitle>Work on the vocabulary you have difficulties with.</Subtitle>
                <ButtonCustom onClick={handleClick} isLoading={isLoading}>Start</ButtonCustom>
            </Card>
        </TrainingQuizzCardWrapper>
    )
};

const TrainingQuizzCardWrapper = styled.div`

`;
