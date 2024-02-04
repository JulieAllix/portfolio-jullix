import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";
import {
    SlideshowButtonsWrapper,
    SlideshowIndividualButtonWrapper
} from "@Pages/quizz/Quizz/CurrentQuizzScreen/Slideshow/layout";

import {useFailedButton} from "@Hooks/quizz/useFailedButton";

interface Props {
    showTranslation: boolean;
    setShowTranslation: (value: boolean) => void;
    page: number;
}

export const RandomQuizzButtons: React.FC<Props> = (props) => {
    const {isLoadingFailedButton, handleClickOnFailed} = useFailedButton();

    return (
        <SlideshowButtonsWrapper>
            <SlideshowIndividualButtonWrapper>
                <ButtonCustom onClick={() => props.setShowTranslation(!props.showTranslation)}>{props.showTranslation ? "Question" : "Answer"}</ButtonCustom>
            </SlideshowIndividualButtonWrapper>
            <SlideshowIndividualButtonWrapper>
                <ButtonCustom isLoading={isLoadingFailedButton} onClick={() => handleClickOnFailed(props.page)}>Failed</ButtonCustom>
            </SlideshowIndividualButtonWrapper>
        </SlideshowButtonsWrapper>
    )
}

