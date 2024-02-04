import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useCreateNewQuizzCardButton} from "@Hooks/quizzCardForm/useCreateNewQuizzCardButton";

interface Props {

}

export const QuizzCardSaveButton: React.FC<Props> = (props) => {
    const {handleClick, isLoading} = useCreateNewQuizzCardButton();

    return (
        <ButtonCustom isLoading={isLoading} onClick={() => handleClick()} color={"white"}>Save</ButtonCustom>
    )
}

