import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useCreateNewQuizzCardButton} from "@Hooks/useCreateNewQuizzCardButton";
import {QuizzCardData} from "@Pages/quizzCardForm/QuizzCardForm";

interface Props {
    quizzCardData: QuizzCardData;
    setQuizzCardData: (value: QuizzCardData) => void;
}

export const QuizzCardSaveButton: React.FC<Props> = (props) => {
    const {handleClick, isLoading} = useCreateNewQuizzCardButton(props.quizzCardData);

    return (
        <ButtonCustom isLoading={isLoading} onClick={() => handleClick(props.setQuizzCardData)} color={"white"}>Save</ButtonCustom>
    )
}

