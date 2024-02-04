import React from "react";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";

import {useSignOutButton} from "@Hooks/settings/useSignOutButton";

interface Props {

}

export const SignOutButton: React.FC<Props> = (props) => {
    const {handleSignOut} = useSignOutButton();

    return (
        <ButtonsWrapper>
            <div style={{width: "10px"}}/>
            <ButtonCustom onClick={handleSignOut} color={"white"}>Sign out</ButtonCustom>
        </ButtonsWrapper>
    );
};

const ButtonsWrapper = styled.div`

`;
