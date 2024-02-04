import {useState} from "react";
import {CardData} from "@Models/types/bases/quizzApp/Form";

export const useSetCardsData = () => {
    const [cardsData, setCardsData] = useState<CardData[]>([]);

    return {cardsData, setCardsData};
};
