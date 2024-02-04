import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import {Slideshow} from "@Pages/quizz/Quizz/CurrentQuizzScreen/Slideshow";

import {setQuizzMode} from "@Utils/redux/reducers/quizzMode";
import {State} from "@Utils/redux/store";

interface Props {

}

export const CurrentQuizzScreen: React.FC<Props> = (props) => {
    const cardsData = useSelector((state: State) => state.cardsData);
    const dispatch = useDispatch();

    return (
        <CurrentQuizzScreenWrapper>
            <QuizzDetailsWrapper>
                <Text>{cardsData.length} question{cardsData.length > 1 ? 's': ''}</Text>
                <Text onClick={() => dispatch(setQuizzMode(null))}>Stop quizz</Text>
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
