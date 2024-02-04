import React, {PropsWithChildren, useState} from "react";
import {QuizzCardData} from "@Pages/quizzCardForm/QuizzCardForm";

export interface IFirebaseContext {
    quizzCardData: QuizzCardData;
    setQuizzCardData: (value: QuizzCardData) => void;
}

export const QuizzContext = React.createContext<IFirebaseContext | null>(null)

export const QuizzProvider: React.FC<PropsWithChildren<{}>> = (props) => {
    const [quizzCardData, setQuizzCardData] = useState<QuizzCardData>({
        nativeLanguageValue: null,
        languageToLearnValue: null,
    });

    return (<QuizzContext.Provider value={{
        quizzCardData, setQuizzCardData,
    }}>
        {props.children}
    </QuizzContext.Provider>)
}
