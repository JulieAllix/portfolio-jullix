import {useContext, useState} from "react";
import {useSelector} from "react-redux";

import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";
import {getAllTrainingCardsOfUser} from "@Utils/firebaseConfig";

import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {QuizzContext} from "@Hooks/context/QuizzContext";
import {ERROR_FETCHING_TRAINING_CARDS_MESSAGE, ERROR_NO_CARDS_MESSAGE} from "@Models/errorMessagesQuizzApp";

export const useStartTrainingQuizzButton = () => {
    const user = useSelector((state: State) => state.user);
    const {setCurrentQuizzCardsList, setQuizzMode} = useContext(QuizzContext);
    const {languageToLearnData} = useFetchLanguageToLearn();
    const { setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userHasTrainingCards = user.trainingCardsList.length > 0;

    const startTrainingQuizzClick = async (): Promise<void> => {
        if (userHasTrainingCards) {
            setIsLoading(true);
            await createAndSetQuizzCardsList();
            setQuizzMode("training");
            resetInitialState();
        } else {
            notification.emit('error', ERROR_NO_CARDS_MESSAGE);
        }
    };

    const createAndSetQuizzCardsList = async ():  Promise<void> => {
        try {
            const trainingCards = await getAllTrainingCardsOfUser(user.trainingCardsList, languageToLearnData.languageUid);
            setCurrentQuizzCardsList(trainingCards);
        } catch (error) {
            notification.emit('error', ERROR_FETCHING_TRAINING_CARDS_MESSAGE);
            console.error('Error fetching training cards:', error);
        }
    };

    const resetInitialState = (): void => {
        setNumberOfQuestionsToPick(0);
        setIsLoading(false);
    };

    return {
        isLoading,
        handleClick: startTrainingQuizzClick,
    };
};
