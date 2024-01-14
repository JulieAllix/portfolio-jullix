import React from "react";
import styled from "styled-components";
import {Label} from "@Components/layout";
import {InputNumber} from "primereact/inputnumber";

interface Props {
    label?: string;
    value: number;
    setValue: (value: number) => void
}

export const InputNumberCustom: React.FC<Props> = (props) => {

    return (
        <InputNumberCustomWrapper>
            {props.label &&
                <Label>{props.label}</Label>
            }
            <InputNumberStyle
                value={props.value}
                onChange={(e) => props.setValue(e.value)}
            />
        </InputNumberCustomWrapper>
    )
}

const InputNumberCustomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
`;

const InputNumberStyle = styled(InputNumber)`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  color: var(--m-grey_dark);
  border-radius: 0px;
`;
