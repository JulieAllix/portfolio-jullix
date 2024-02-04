import React from "react";
import styled from "styled-components";

import {RandomQuizzCard} from "@Pages/quizz/Quizz/LaunchQuizzOptionsScreen/RandomQuizzCard";
import {TrainingQuizzCard} from "@Pages/quizz/Quizz/LaunchQuizzOptionsScreen/TrainingQuizzCard";
import {CardsWrapper} from "@Components/layout";

import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";

interface Props {

}

export const LaunchQuizzOptionsScreen: React.FC<Props> = (props) => {
    const { numberOfQuestionsToPick, setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();

    return (
        <LaunchQuizzOptionsScreenWrapper>
            <CardsWrapper padding={"0 0 20px 0"} style={{height: `${window.innerHeight*0.8}px`, }}>
                <RandomQuizzCard
                    numberOfQuestionsToPick={numberOfQuestionsToPick}
                    setNumberOfQuestionsToPick={setNumberOfQuestionsToPick}
                />
                <TrainingQuizzCard />
            </CardsWrapper>
        </LaunchQuizzOptionsScreenWrapper>
    )
}

const LaunchQuizzOptionsScreenWrapper = styled.div`

`;
