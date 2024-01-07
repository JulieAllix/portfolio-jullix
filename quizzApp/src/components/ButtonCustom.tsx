import * as React from "react";
import styled from "styled-components";
import { ProgressSpinner } from 'primereact/progressspinner';
import {Button} from "primereact/button";

interface Props {
    onClick: () => void;
    isLoading?: boolean;
    color?: "pink" | "white";
}

export const ButtonCustom: React.FC<Props> = (props) => {

    return (
        <ButtonWrapper>
            <ButtonStyle onClick={props.isLoading ? () => {} : props.onClick} color={props.color ? props.color : "pink"}>
                {props.isLoading ?
                    <LoadingWrapper>
                        <ButtonText color={props.color ? props.color : "pink"}>Loading</ButtonText>
                        <ProgressSpinner style={{height: "24px", width: "24px", margin: "0 0 0 12px"}} />
                    </LoadingWrapper>
                    :
                    <ButtonText color={props.color ? props.color : "pink"}>
                        {props.children}
                    </ButtonText>
                }
            </ButtonStyle>
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const ButtonStyle = styled(Button)<{color: "pink" | "white"}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props => props.color === "pink" ? "var(--m-primary)" : "white"};
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.div<{color: "pink" | "white"}>`
  font-size: 24px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  color: ${props => props.color === "white" ? "var(--m-primary)" : "white"};
`;
