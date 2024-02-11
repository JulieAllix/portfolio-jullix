import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {ButtonCustom} from "@Components/ButtonCustom";
import {Card, CardTitle, Subtitle} from "@Components/layout";

import {State} from "@Utils/redux/store";
import {handleResetPassword} from "@Utils/authUtils";

interface Props {

}

export const UserData: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);

    return (
        <Card>
            <CardTitle>Personal data</CardTitle>
            <Subtitle>{user.email}</Subtitle>
            <Subtitle><Accent>{user.numberOfCards}</Accent> card{user.numberOfCards > 1 ? "s" : ""} created</Subtitle>
            <ButtonCustom onClick={() => user ? handleResetPassword(user.email) : () => {}}>Reset password</ButtonCustom>
        </Card>
    );
};

const Accent = styled.span`
  color: var(--m-primary);
`;
