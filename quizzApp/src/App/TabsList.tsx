import React, {useRef, useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import {PictogramCustom} from "../components/PictogramCustom";

import { useMeasure } from "./use-measure";
import {TabsPager} from "./TabsList/TabsPager";

interface Props {

}

export const TabsList: React.FC<Props> = (props) => {
    const { ref } = useMeasure();
    const tabListRef = useRef(null);

    const childRefs = useRef(new Map());
    const [value, setValue] = useState<number>(0);

    return (
        <TabsListWrapper>
            <TabContainer ref={ref}>
                <TabList ref={tabListRef}>
                    <motion.div
                        className={value === 0 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(0, el)}
                        onClick={() => setValue(0)}
                    >
                        <div>Quizz</div>
                    </motion.div>
                    <motion.div
                        className={value === 1 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(1, el)}
                        onClick={() => setValue(1)}
                    >
                        <PictogramCustom name={value === 1 ? 'AddPink' : 'AddGrey'} width={'55px'}/>
                    </motion.div>
                    <motion.div
                        className={value === 2 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(2, el)}
                        onClick={() => setValue(2)}
                    >
                        <div>Settings</div>
                    </motion.div>
                </TabList>
            </TabContainer>
            <TabsPager value={value}>

            </TabsPager>
        </TabsListWrapper>
    )
}

const TabsListWrapper = styled.div`
  display: flex;
  height: var(--app-height);
  flex-direction: column;
  position: relative;
`;

const TabContainer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: transparent;
`;

const TabList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: white;
`;
