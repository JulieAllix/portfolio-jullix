import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useCheckErrors} from "@Hooks/useCheckErrors";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";
import {getRandomCardsOfUser} from "@Utils/firebaseConfig";
import {notification} from "@Utils/events";
import {setCardsData} from "@Utils/redux/reducers/cardsData";
import {setQuizzMode} from "@Utils/redux/reducers/quizzMode";
import {State} from "@Utils/redux/store";
import {CardData} from "@Models/types/bases/quizzApp/Form";

export const useStartRandomQuizzButton = (numberOfQuestionsToPick: number) => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const { checkErrors } = useCheckErrors({numberOfQuestionsToPick: numberOfQuestionsToPick});
    const { setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();
    const {languageToLearnData} = useFetchLanguageToLearn();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isNumberOfQuestionsToPickHigherThanTotalNumberOfCards = (responseCardsData): boolean => Number(numberOfQuestionsToPick) > responseCardsData.length;

    const selectedQuestionIndexes: number [] = [];
    const randomlySelectedData = [];

    const handleQuizzCreation = (responseCardsData: CardData[]): void => {
        dispatch(setQuizzMode("random"));
        createRandomlySelectedData(responseCardsData);
        dispatch(setCardsData(randomlySelectedData));
    };

    const createRandomlySelectedData = (responseCardsData: CardData[]): void => {
        do {
            const questionIndex = Math.floor(responseCardsData.length * Math.random())
            if (!selectedQuestionIndexes.includes(questionIndex)) {
                randomlySelectedData.push(responseCardsData[questionIndex]);
                selectedQuestionIndexes.push(questionIndex);
            }
        } while (randomlySelectedData.length < numberOfQuestionsToPick);
    };

    const resetSettingsToInitialState = (): void => {
        setNumberOfQuestionsToPick(0);
        setIsLoading(false);
    };

    const startRandomQuizzClick = (): void => {
        if (checkErrors().length > 0) {
            checkErrors().forEach((error) => notification.emit("error", error.message));
        } else {
            setIsLoading(true);
            getRandomCardsOfUser(user.userUid, Number(numberOfQuestionsToPick), languageToLearnData.languageUid).then(responseCardsData => {
                if (isNumberOfQuestionsToPickHigherThanTotalNumberOfCards(responseCardsData)) {
                    notification.emit('error', `Please choose a number of questions below or equal to ${responseCardsData.length} (the total number of cards you have created so far).`);
                } else {
                    handleQuizzCreation(responseCardsData);
                    resetSettingsToInitialState();
                };
            }).catch(error => {
                console.log('error getRandomCardsOfUser in useStartRandomQuizzButton', error);
                setIsLoading(false);
            });
        };
    };

    return {
        isLoading,
        handleClick: startRandomQuizzClick,
    };
}
