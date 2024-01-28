import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

import {LanguageParams} from "@Pages/settings/Settings/LanguageParams";
import {SignOutButton} from "@Pages/settings/Settings/SignOutButton";
import {UserData} from "@Pages/settings/Settings/UserData";
import {CardsWrapper, Instruction} from "@Components/layout";

interface Props {

}

export const Settings: React.FC<Props> = (props) => {

    return (
        <SettingsWrapper>
            <ContentWrapper>
                <Instruction width={"60%"}>Settings</Instruction>
                <CardsWrapper style={{height: `${window.innerHeight*0.75}px`}}>
                    <UserData />
                    <LanguageParams />
                    <SignOutButton />
                </CardsWrapper>
            </ContentWrapper>
        </SettingsWrapper>
    )
}

const SettingsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;
