import {createAction, handleActions} from 'redux-actions';
import {CardData} from "@Models/types/bases/quizzApp/Form";

export const setCardsData = createAction<CardData[]>("cardsData.setCardsData");

const initialState = [] as CardData[];

export const cardsDataReducer = handleActions({
    ["cardsData.setCardsData"]: (state, action) => {
        return action.payload;
    }
}, initialState);
