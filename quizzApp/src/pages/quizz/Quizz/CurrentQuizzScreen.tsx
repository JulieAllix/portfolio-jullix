import React, {useContext} from "react";
import styled from "styled-components";

import {Slideshow} from "@Pages/quizz/Quizz/CurrentQuizzScreen/Slideshow";

import {QuizzContext} from "@Hooks/context/QuizzContext";

interface Props {

}

export const CurrentQuizzScreen: React.FC<Props> = (props) => {
    const {currentQuizzCardsList, setQuizzMode} = useContext(QuizzContext);

    return (
        <CurrentQuizzScreenWrapper>
            <QuizzDetailsWrapper>
                <Text>{currentQuizzCardsList.length} question{currentQuizzCardsList.length > 1 ? 's': ''}</Text>
                <Text onClick={() => setQuizzMode(null)}>Stop quizz</Text>
            </QuizzDetailsWrapper>
            <Slideshow />
        </CurrentQuizzScreenWrapper>
    )
}

const CurrentQuizzScreenWrapper = styled.div`

`;

const QuizzDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
`;

const Text = styled.div`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  text-align: center;
  margin-bottom: 24px;
  color: white;
`;
