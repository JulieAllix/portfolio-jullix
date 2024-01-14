import React from "react";
import styled from "styled-components";
import {Password} from "primereact/password";
import {InputText} from "primereact/inputtext";

import {Label} from "@Components/layout";

interface Props {
    label?: string;
    value: string ;
    setValue: (value: string) => void;
    margin?: string;
    type?: "password"
}

export const InputCustom: React.FC<Props> = (props) => {

    return (
        <InputCustomWrapper margin={props.margin}>
            {props.label &&
                <Label>{props.label}</Label>
            }
            {props.type === "password" ?
                <Password
                    name={"password"}
                    aria-describedby="password-help"
                    toggleMask
                    feedback={false}
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                    placeholder={"******"}
                    className={"w-full"}
                    inputClassName={"w-full"}
                />
            :
                <InputTextStyle
                    className={"w-full"}
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                />
            }
        </InputCustomWrapper>
    )
}

const InputCustomWrapper = styled.div<{margin: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${props => props.margin ? props.margin : "0 0 12px 0"};

  .p-inputtext {
    padding: 15px 20px!important;
    border-radius: 0px!important;
    background-color: var(--m-grey_light)!important;
    color: var(--m-grey_dark)!important;
  }
  .p-inputtext:focus, .p-inputtext-focused {
    border-color: var(--m-primary)!important;
    box-shadow: 0 0 0 2px rgb(245, 53, 87) !important;
  }

  .p-inputtext:hover {
    border-color: var(--m-primary)!important;
  }
`;

const InputTextStyle = styled(InputText)`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  color: var(--m-grey_dark);
  border-radius: 0px;
`;
