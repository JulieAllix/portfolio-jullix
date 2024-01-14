import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
    value: number;
}

export const TabsPager: React.FC<Props> = (props) => {

    return (
        <TabsPagerWrapper>
            <PagerAnimatedContainer
                transition={{
                    tension: 190,
                    friction: 70,
                    mass: 0.4
                }}
                initial={false}
                animate={{ x: props.value * -100 + "%" }}
            >
                {React.Children.map(props.children, (child, i) => (
                    <TabsPagerPage
                        key={i}
                        aria-hidden={props.value !== i}
                        tabIndex={props.value === i ? 0 : -1}
                    >
                        {child}
                    </TabsPagerPage>
                ))}
            </PagerAnimatedContainer>
        </TabsPagerWrapper>
    )
}

const TabsPagerWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const PagerAnimatedContainer = styled(motion.div)`
  flex-direction: row;
  direction: ltr;
  will-change: transform;
  min-height: 0;
  flex: 1;
  display: flex;
`;

const TabsPagerPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 100%;

  overflow: hidden;
  outline: none;
`;
