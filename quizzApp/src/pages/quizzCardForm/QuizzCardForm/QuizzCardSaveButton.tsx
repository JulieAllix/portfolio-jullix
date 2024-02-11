import React from "react";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useCreateNewQuizzCardButton} from "@Hooks/quizzCardForm/useCreateNewQuizzCardButton";

interface Props {

}

export const QuizzCardSaveButton: React.FC<Props> = (props) => {
    const {handleCreateNewQuizzCardClick, isLoading} = useCreateNewQuizzCardButton();

    return (
        <ButtonCustom isLoading={isLoading} onClick={() => handleCreateNewQuizzCardClick()} color={"white"}>Save</ButtonCustom>
    )
}

