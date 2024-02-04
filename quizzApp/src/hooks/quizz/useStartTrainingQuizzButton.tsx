import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {useSetNumberOfQuestionsToPick} from "@Hooks/quizz/useSetNumberOfQuestionsToPick";
import {getAllTrainingCardsOfUser} from "@Utils/firebaseConfig";
import {setQuizzMode} from "@Utils/redux/reducers/quizzMode";
import {setCardsData} from "@Utils/redux/reducers/cardsData";
import {notification} from "@Utils/events";
import {State} from "@Utils/redux/store";
import {CardData} from "@Models/types/bases/quizzApp/Form";

export const useStartTrainingQuizzButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const {languageToLearnData} = useFetchLanguageToLearn();
    const { setNumberOfQuestionsToPick } = useSetNumberOfQuestionsToPick();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userHasTrainingCards = user.trainingCardsList.length > 0;

    const handleQuizzCreation = (allTrainingCardsOfUser: CardData[]): void => {
        dispatch(setQuizzMode("training"));
        dispatch(setCardsData(allTrainingCardsOfUser));
    };

    const resetSettingsToInitialState = (): void => {
        setNumberOfQuestionsToPick(0);
        setIsLoading(false);
    };

    const startTrainingQuizzClick = (): void => {
        if (userHasTrainingCards) {
            setIsLoading(true);
            getAllTrainingCardsOfUser(user.trainingCardsList, languageToLearnData.languageUid).then(allTrainingCardsOfUser => {
                handleQuizzCreation(allTrainingCardsOfUser)
                resetSettingsToInitialState();
            }).catch(error => {
                console.log('error getAllTrainingCardsOfUser in useStartTrainingQuizzButton', error);
                setIsLoading(false);
            })
        } else {
            notification.emit('error', 'There are no cards in the trainings list at the moment.');
        };
    };

    return {
        isLoading,
        handleClick: startTrainingQuizzClick,
    };
};
