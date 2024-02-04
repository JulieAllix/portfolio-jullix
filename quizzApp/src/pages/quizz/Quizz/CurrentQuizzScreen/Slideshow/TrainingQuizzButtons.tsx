import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";
import { SlideshowButtonsWrapper, SlideshowIndividualButtonWrapper } from "./layout";

import {useSuccessButton} from "@Hooks/quizz/useSuccessButton";

interface Props {
    showTranslation: boolean;
    setShowTranslation: (value: boolean) => void;
    page: number;
}

export const TrainingQuizzButtons: React.FC<Props> = (props) => {
    const {isLoadingSuccessButton, handleClickOnSuccess} = useSuccessButton();

    return (
        <SlideshowButtonsWrapper>
            <SlideshowIndividualButtonWrapper>
                <ButtonCustom color={"white"} onClick={() => props.setShowTranslation(!props.showTranslation)}>{props.showTranslation ? "Question" : "Answer"}</ButtonCustom>
            </SlideshowIndividualButtonWrapper>
            <SlideshowIndividualButtonWrapper>
                <ButtonCustom color={"white"} isLoading={isLoadingSuccessButton} onClick={() => handleClickOnSuccess(props.page)}>Success</ButtonCustom>
            </SlideshowIndividualButtonWrapper>
        </SlideshowButtonsWrapper>
    )
}

