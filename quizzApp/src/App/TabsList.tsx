import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

import {FormTab} from "./TabsList/FormTab";
import {PictogramCustom} from "../components/PictogramCustom";
import {QuizzTab} from "./TabsList/QuizzTab";
import {SettingsTab} from "./TabsList/SettingsTab";
import {TabsPager} from "./TabsList/TabsPager";

import { useMeasure } from "./use-measure";
import {getUserFirebaseData} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {State} from "@Utils/redux/store";

interface Props {

}

export const TabsList: React.FC<Props> = (props) => {
    const { ref } = useMeasure();
    const dispatch = useDispatch();
    const tabListRef = useRef(null);
    const user = useSelector((state: State) => state.user);
    const childRefs = useRef(new Map());

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        if (user) {
            getUserFirebaseData(user.userUid).then(_user => {
                dispatch(setUser(_user));
            });
        };
    }, []);

    return (
        <TabsListWrapper>
            <TabContainer ref={ref}>
                <TabList ref={tabListRef}>
                    <TabItem
                        isActive={value === 0}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(0, el)}
                        onClick={() => setValue(0)}
                    >
                        <div>Quizz</div>
                    </TabItem>
                    <TabItem
                        isActive={value === 1}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(1, el)}
                        onClick={() => setValue(1)}
                    >
                        <PictogramCustom name={value === 1 ? 'AddPink' : 'AddGrey'} width={'55px'}/>
                    </TabItem>
                    <TabItem
                        isActive={value === 2}
                        whileHover={{ backgroundColor: "#f1f3f5" }}
                        transition={{ duration: 0.1 }}
                        whileTap={{ backgroundColor: "#e9ecef" }}
                        ref={el => childRefs.current.set(2, el)}
                        onClick={() => setValue(2)}
                    >
                        <div>Settings</div>
                    </TabItem>
                </TabList>
            </TabContainer>
            <TabsPager value={value}>
                <QuizzTab />
                <FormTab />
                <SettingsTab />
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
  bottom: -1px;
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

const TabItem = styled(motion.div)<{isActive: boolean}>`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0px;
  text-align: center;
  color: ${props => props.isActive ? "var(--m-primary)" : "var(--m-grey_dark)"};
  cursor: pointer;
`;
