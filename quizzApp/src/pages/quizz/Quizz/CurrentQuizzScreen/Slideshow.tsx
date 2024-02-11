import React, {useContext, useState} from "react";
import {useDispatch} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";
import styled from "styled-components";

import {RandomQuizzButtons} from "@Pages/quizz/Quizz/CurrentQuizzScreen/Slideshow/RandomQuizzButtons";
import {TrainingQuizzButtons} from "@Pages/quizz/Quizz/CurrentQuizzScreen/Slideshow/TrainingQuizzButtons";

import {QuizzContext} from "@Hooks/context/QuizzContext";

const variants = {
    enter: direction => ({
        x: direction > 0 ? 700 : -700,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: direction => ({
        x: direction > 0 ? -700 : 700,
        opacity: 0,
    }),
}

interface Props {

}

export const Slideshow: React.FC<Props> = (props) => {
    const dispatch = useDispatch();

    const {currentQuizzCardsList, quizzMode, setQuizzMode} = useContext(QuizzContext);

    const [[page, direction], setPage] = useState<number[]>([0, 0]);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);

    const paginate = (direction): void => {
        if (page + direction > currentQuizzCardsList.length -1) {
            dispatch(setQuizzMode(null))
        } else if (page + direction === -1) {

        } else {
            setPage([ page + direction, direction ]);
            setShowTranslation(false);
        }
    };

    return (
        <SlideshowWrapper>
            <AnimatePresence custom={direction}>
                <MotionDiv
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"

                    drag={"x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={ (e, { offset, velocity }) => {
                        if (offset.x > 150) {
                            paginate(-1)
                        } else if (offset.x < -150) {
                            paginate(1)
                        }
                    }}
                >
                    <CardContent isAnswer={showTranslation}>
                        {!showTranslation && currentQuizzCardsList[page]?.nativeLanguageValue}
                        {showTranslation && currentQuizzCardsList[page]?.languageToLearnValue}
                    </CardContent>
                </MotionDiv>
            </AnimatePresence>
            {quizzMode === "random" ?
                <RandomQuizzButtons showTranslation={showTranslation} setShowTranslation={setShowTranslation} page={page} /> :
                quizzMode === "training" &&
                <TrainingQuizzButtons showTranslation={showTranslation} setShowTranslation={setShowTranslation} page={page} />
            }
        </SlideshowWrapper>
    )
}

const SlideshowWrapper = styled.div`
  position: relative;
  height: 350px;
  display: flex;
  margin-top: 10px;
`;

const MotionDiv = styled(motion.div)`
  min-height: 260px;
  width: 100%;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;
`;

const CardContent = styled.div<{isAnswer: boolean}>`
  font-size: 20px;
  text-align: center;
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  color: ${props => props.isAnswer ? "var(--m-primary)" : "black"};
`;
