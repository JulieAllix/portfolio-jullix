import {useState} from "react";

export const useSetNumberOfQuestionsToPick = () => {
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<number>(0);

    return {numberOfQuestionsToPick, setNumberOfQuestionsToPick};
};
