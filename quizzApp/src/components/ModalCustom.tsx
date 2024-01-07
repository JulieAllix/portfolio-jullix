import React from "react";
import styled from "styled-components";
import { Dialog } from 'primereact/dialog';

import {ButtonCustom} from "@Components/ButtonCustom";

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    title: string;
    buttonAction?: () => void;
}

export const ModalCustom: React.FC<Props> = (props) => {

    const renderHeader = (): JSX.Element => {
        return (
            <div>
                <ModalTitle>{props.title}</ModalTitle>
            </div>
        );
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div>
                <ButtonCustom onClick={props.buttonAction ? props.buttonAction : () => props.setVisible(false)}>Ok</ButtonCustom>
            </div>
        )
    }

    const header = renderHeader();
    const footer = renderFooter();

    return (
        <ModalCustomWrapper>
            <Dialog
                header={header}
                footer={footer}
                visible={props.visible}
                onHide={() => props.setVisible(false)}
                style={{width: "95vw"}}
                content={<ModalContent>
                    {props.children}
                </ModalContent>}
            >

            </Dialog>
        </ModalCustomWrapper>
    )
}

const ModalCustomWrapper = styled.div`
  .ant-modal {
    //width: 800px!important;
    width: calc(100vw - 40px) !important;
    top: 60% !important;
  }

  .ant-modal-header {
    padding: 20px!important;
  }

  .ant-modal-close {
    padding: 0px!important;
  }

  .ant-modal-content {
    //border-radius: 20px!important;
  }

  .ant-modal-body {
    padding: 20px!important;
  }

  .ant-modal-footer {
    padding: 0px 20px 20px 20px!important;
    border: none!important;
  }

  .ant-modal-title {
    font-size: 14px!important;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
  }

  .ant-btn {
    font-size: 14px!important;
    height: 80px!important;
    padding: 5px 40px!important;
  }

  .ant-modal-close-x {
    font-size: 16px!important;
  }
`;

const ModalContent = styled.div`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
`;

const ModalTitle = styled.span`
  font-size: 20px;
  font-family: Poppins;
  font-weight: bold;
  font-style: normal;
`;
