import React from "react";
import styled from "styled-components";
import {CardData} from "@Models/types/bases/quizzApp/Form";

interface Props {
    cardsData: CardData[],
    quizzMode: "random" | "training" | null;
    setQuizzMode: (value: "random" | "training" | null) => void;
    handleSuccess: (value: number) => void;
    handleFailed: (value: number) => void;
    isLoading: "random" | "training" | "trainingsList" | null;
}

export const Slideshow: React.FC<Props> = (props) => {

    return (
        <SlideshowWrapper>

        </SlideshowWrapper>
    )
}

const SlideshowWrapper = styled.div`

`;
