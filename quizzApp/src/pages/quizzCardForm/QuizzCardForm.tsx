import React, {useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

import {QuizzCardInputs} from "@Pages/quizzCardForm/QuizzCardForm/QuizzCardInputs";
import {QuizzCardSaveButton} from "@Pages/quizzCardForm/QuizzCardForm/QuizzCardSaveButton";
import {CardsWrapper, Instruction} from "@Components/layout";

export interface QuizzCardData {
    nativeLanguageValue: string;
    languageToLearnValue: string;
}

interface Props {

}

export const QuizzCardForm: React.FC<Props> = (props) => {
    const [quizzCardData, setQuizzCardData] = useState<QuizzCardData>({
        nativeLanguageValue: null,
        languageToLearnValue: null,
    });

    return (
        <FormWrapper>
            <ContentWrapper>
                <Instruction width={"70%"}>New quizz card</Instruction>
                <CardsWrapper padding={"0 0 20px 0"} style={{height: `${window.innerHeight*0.8}px`}}>
                    <QuizzCardInputs quizzCardData={quizzCardData} setQuizzCardData={setQuizzCardData}/>
                    <QuizzCardSaveButton quizzCardData={quizzCardData} setQuizzCardData={setQuizzCardData}/>
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
