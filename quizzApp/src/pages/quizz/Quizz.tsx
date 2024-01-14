import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {motion} from "framer-motion";

import {InputNumberCustom} from "@Components/InputNumberCustom";
import {Slideshow} from "@Pages/quizz/Quizz/Slideshow";

import {CardData} from "@Models/types/bases/quizzApp/Form";
import {State} from "@Utils/redux/store";
import {
    getAllTrainingCardsOfUser,
    getLanguageByUid,
    getRandomCardsOfUser,
    getUserFirebaseData,
    saveUser
} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers/user";
import {notification} from "@Utils/events";
import {ButtonCustom} from "@Components/ButtonCustom";
import {Language} from "@Models/types/bases/quizzApp/Language";

interface Props {

}

export const Quizz: React.FC<Props> = (props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [languageToLearnData, setLanguageToLearnData] = useState<Language>(null);
    const [quizzMode, setQuizzMode] = useState<"random" | "training" | null>(null);
    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<"random" | "training" | "trainingsList" | null>(null);

    useEffect(() => {
        getLanguageByUid(user.languageToLearn).then(_language => {
            setLanguageToLearnData(_language);
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, [user]);

    const handleStartRandomQuizz = (): void => {
        if (numberOfQuestionsToPick === 0) {
            notification.emit('error', 'Please define a number of questions higher than 0.');
        } else {
            setIsLoading("random");
            getRandomCardsOfUser(user.userUid, Number(numberOfQuestionsToPick), languageToLearnData.languageUid).then(response => {
                if (Number(numberOfQuestionsToPick) > response.length) {
                    notification.emit('error', `Please choose a number of questions below or equal to ${response.length} (the total number of cards you have created so far).`);
                } else {
                    setQuizzMode("random");
                    const allData = [...response];
                    const randomlySelectedData = [];
                    const selectedQuestionIndexes: number [] = [];

                    do {
                        // get a random question from theme
                        const questionIndex = Math.floor(allData.length * Math.random())
                        if (!selectedQuestionIndexes.includes(questionIndex)) {
                            randomlySelectedData.push(allData[questionIndex]);
                            selectedQuestionIndexes.push(questionIndex);
                        }
                    } while (randomlySelectedData.length < numberOfQuestionsToPick);
                    setNumberOfQuestionsToPick(0);
                    setCardsData(randomlySelectedData);
                    setIsLoading(null);
                }
            }).catch(error => {
                console.log('error getAllCardsOfUser Quizz', error);
                setIsLoading(null);
            })
        }
    };

    const handleStartTrainingQuizz = (): void => {
        if (user.trainingCardsList.length > 0) {
            setIsLoading("training");
            getAllTrainingCardsOfUser(user.trainingCardsList, languageToLearnData.languageUid).then(allTrainingCardsOfUser => {
                setQuizzMode("training");
                setCardsData(allTrainingCardsOfUser);
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
                <Instruction>{quizzMode === null ? "Quizz mode" : quizzMode === "random" ? "Random quizz" : "Training quizz"}</Instruction>
                <div>
                    {quizzMode !== null &&
                        <QuizzDetailsWrapper>
                            <Text>{cardsData.length} question{cardsData.length > 1 ? 's': ''}</Text>
                            <Text onClick={() => setQuizzMode(null)}>Stop quizz</Text>
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
                    <CardsWrapper style={{height: `${window.innerHeight*0.8}px`, }}>
                        <Card>
                            <CardTitle>Random quizz</CardTitle>
                            <Subtitle>Choose the number of questions to pick randomly from your database.</Subtitle>
                            <InputNumberCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                            <ButtonCustom onClick={handleStartRandomQuizz} isLoading={isLoading === "random" ? true : false}>Start</ButtonCustom>
                        </Card>
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

const Instruction = styled.div`
  font-size: 32px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 50px;
  text-align: left;
  color: white;
  line-height: 30px;
  width: 60%;
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

const CardsWrapper = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 12px;
  margin-bottom: 24px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Subtitle = styled.div`
  font-size: 12px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 12px;
  color: var(--m-grey_dark);
`;
