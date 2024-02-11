import {useContext, useState} from "react";

import {useCheckErrors} from "@Hooks/useCheckErrors";
import {useFetchRandomCardsOfUser} from "@Hooks/quizz/useFetchRandomCardsOfUser";
import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";

import {notification} from "@Utils/events";
import {CardData} from "@Models/types/bases/quizzApp/Form";
import {QuizzContext} from "@Hooks/context/QuizzContext";
import {ERROR_FETCHING_RANDOM_CARDS_MESSAGE} from "@Models/errorMessagesQuizzApp";

export const useStartRandomQuizzButton = (numberOfQuestionsToPick: number) => {
    const {setCurrentQuizzCardsList, setQuizzMode} = useContext(QuizzContext);
    const { checkErrors } = useCheckErrors({numberOfQuestionsToPick: numberOfQuestionsToPick});
    const { setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();
    const { fetchRandomCardsOfUser } = useFetchRandomCardsOfUser();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startRandomQuizzClick = async (): Promise<void> => {
        const errors = checkErrors();

        if (errors.length > 0) {
            errors.forEach((error) => notification.emit("error", error.message));
        } else {
            setIsLoading(true);
            await createAndSetQuizzCardsList();
            setQuizzMode("random");
            resetInitialState();
        }
    };

    const createAndSetQuizzCardsList = async ():  Promise<void> => {
        try {
            const cardsList = await fetchRandomCardsOfUser(Number(numberOfQuestionsToPick));
            const shuffledCards = shuffleCards(cardsList);
            setCurrentQuizzCardsList(shuffledCards);
        } catch (error) {
            notification.emit('error', ERROR_FETCHING_RANDOM_CARDS_MESSAGE);
            console.error('Error fetching training cards:', error);
        }
    };

    const shuffleCards = (cardsList: CardData[]): CardData[] => {
        const shuffledCards = [...cardsList];

        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }

        return shuffledCards;
    };

    const resetInitialState = (): void => {
        setNumberOfQuestionsToPick(0);
        setIsLoading(false);
    };

    return {
        isLoading,
        handleClick: startRandomQuizzClick,
    };
}
