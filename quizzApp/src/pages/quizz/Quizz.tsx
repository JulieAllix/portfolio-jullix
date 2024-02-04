import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {motion} from "framer-motion";

import {CurrentQuizzScreen} from "@Pages/quizz/Quizz/CurrentQuizzScreen";
import {LaunchQuizzOptionsScreen} from "@Pages/quizz/Quizz/LaunchQuizzOptionsScreen";
import {Instruction} from "@Components/layout";

import {State} from "@Utils/redux/store";

interface Props {

}

export const Quizz: React.FC<Props> = (props) => {
    const quizzMode = useSelector((state: State) => state.quizzMode);

    return (
        <QuizzWrapper>
            <ContentWrapper>
                <Instruction width={"60%"}>{quizzMode === null ? "Quizz mode" : quizzMode === "random" ? "Random quizz" : "Training quizz"}</Instruction>
                {quizzMode === null ? <LaunchQuizzOptionsScreen /> : <CurrentQuizzScreen />}
            </ContentWrapper>
        </QuizzWrapper>
    );
};

const QuizzWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 70px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
`;
