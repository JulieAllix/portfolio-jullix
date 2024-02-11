import React, {PropsWithChildren, useState} from "react";
import {QuizzCardData} from "@Pages/quizzCardForm/QuizzCardForm";
import {CardData} from "@Models/types/bases/quizzApp/Form";
import {QuizzMode} from "@Models/types/bases/quizzApp/Quizz";

export interface IFirebaseContext {
    quizzCardData: QuizzCardData;
    setQuizzCardData: (value: QuizzCardData) => void;
    currentQuizzCardsList: CardData[];
    setCurrentQuizzCardsList: (value: CardData[]) => void;
    quizzMode: QuizzMode;
    setQuizzMode: (value: QuizzMode) => void;
}

export const QuizzContext = React.createContext<IFirebaseContext | null>(null)

export const QuizzProvider: React.FC<PropsWithChildren<{}>> = (props) => {
    const [quizzCardData, setQuizzCardData] = useState<QuizzCardData>({
        nativeLanguageValue: null,
        languageToLearnValue: null,
    });
    const [currentQuizzCardsList, setCurrentQuizzCardsList] = useState<CardData[]>(null);
    const [quizzMode, setQuizzMode] = useState<QuizzMode>(null);

    return (<QuizzContext.Provider value={{
        quizzCardData, setQuizzCardData,
        currentQuizzCardsList, setCurrentQuizzCardsList,
        quizzMode, setQuizzMode,
    }}>
        {props.children}
    </QuizzContext.Provider>)
}
