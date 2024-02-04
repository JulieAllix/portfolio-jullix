import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {motion} from "framer-motion";

import {ButtonCustom} from "@Components/ButtonCustom";
import {RandomQuizzCard} from "@Pages/quizz/Quizz/RandomQuizzCard";
import {Slideshow} from "@Pages/quizz/Quizz/Slideshow";
import {Card, CardsWrapper, CardTitle, Instruction, Subtitle} from "@Components/layout";

import {
    getAllTrainingCardsOfUser,
    getUserFirebaseData,
    saveUser
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";
import {setQuizzMode} from "@Utils/redux/reducers/quizzMode";
import {setCardsData} from "@Utils/redux/reducers/cardsData";

interface Props {

}

export const Quizz: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const quizzMode = useSelector((state: State) => state.quizzMode);
    const cardsData = useSelector((state: State) => state.cardsData);
    const dispatch = useDispatch();
    const {languageToLearnData} = useFetchLanguageToLearn();

    const { numberOfQuestionsToPick, setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();

    const [isLoading, setIsLoading] = useState<"random" | "training" | "trainingsList" | null>(null);
    //dispatch(setQuizzMode(null))

    const handleStartTrainingQuizz = (): void => {
        if (user.trainingCardsList.length > 0) {
            setIsLoading("training");
            getAllTrainingCardsOfUser(user.trainingCardsList, languageToLearnData.languageUid).then(allTrainingCardsOfUser => {
                dispatch(setQuizzMode("training"));
                dispatch(setCardsData(allTrainingCardsOfUser));
                setNumberOfQuestionsToPick(0);
                setIsLoading(null);
            }).catch(error => {
                console.log('error getAllTrainingCardsOfUser Quizz', error);
                setIsLoading(null);
            })
        } else {
            notification.emit('error', 'There are no cards in the trainings list at the moment.');
        };
    };

    const handleSuccess = (index: number): void => {
        setIsLoading("trainingsList");
        const trainingCardsList = [...user.trainingCardsList];
        const updatedTrainingCardsList = trainingCardsList.filter(card => card !== cardsData[index].cardUid);
        const userData = {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        }
        saveUser(userData).then(() => {
            getUserFirebaseData(user.userUid).then(_user => {
                dispatch(setUser(_user));
                notification.emit("success", "This card got removed from your training cards list !");
                setIsLoading(null);
            })
        }).catch(error => {
            notification.emit("error", "This card couldn't get removed from your training cards list.");
            console.log("error saveUser : ", error);
            setIsLoading(null);
        });
    };

    const handleFailed = (index: number): void => {
        setIsLoading("trainingsList");
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(cardsData[index].cardUid);
        const userData = {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        }
        saveUser(userData).then(() => {
            getUserFirebaseData(user.userUid).then(_user => {
                dispatch(setUser(_user));
                notification.emit("success", "This card got added to your training cards list !");
                setIsLoading(null);
            })
        }).catch(error => {
            notification.emit("error", "This card couldn't be added to your training cards list.");
            console.log("error saveUser : ", error)
            setIsLoading(null);
        });
    };

    return (
        <QuizzWrapper>
            <ContentWrapper>
                <Instruction width={"60%"}>{quizzMode === null ? "Quizz mode" : quizzMode === "random" ? "Random quizz" : "Training quizz"}</Instruction>
                <div>
                    {quizzMode !== null &&
                        <QuizzDetailsWrapper>
                            <Text>{cardsData.length} question{cardsData.length > 1 ? 's': ''}</Text>
                            <Text onClick={() => dispatch(setQuizzMode(null))}>Stop quizz</Text>
                        </QuizzDetailsWrapper>
                    }
                    {quizzMode !== null &&
                        <Slideshow
                            cardsData={cardsData}
                            quizzMode={quizzMode}
                            setQuizzMode={setQuizzMode}
                            handleSuccess={handleSuccess}
                            handleFailed={handleFailed}
                            isLoading={isLoading}
                        />
                    }
                </div>
                {quizzMode === null &&
                    <CardsWrapper padding={"0 0 20px 0"} style={{height: `${window.innerHeight*0.8}px`, }}>
                      <RandomQuizzCard
                          numberOfQuestionsToPick={numberOfQuestionsToPick}
                          setNumberOfQuestionsToPick={setNumberOfQuestionsToPick}
                          setIsLoading={setIsLoading}
                          setQuizzMode={setQuizzMode}
                          setCardsData={setCardsData}
                      />
                        <Card>
                            <CardTitle>Training quizz</CardTitle>
                            <Subtitle>Work on the vocabulary you have difficulties with.</Subtitle>
                            <ButtonCustom onClick={handleStartTrainingQuizz} isLoading={isLoading === "training" ? true : false}>Start</ButtonCustom>
                        </Card>
                    </CardsWrapper>
                }
            </ContentWrapper>
        </QuizzWrapper>
    )
}

const QuizzWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 70px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
`;

const QuizzDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
`;

const Text = styled.div`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  text-align: center;
  margin-bottom: 24px;
  color: white;
`;

