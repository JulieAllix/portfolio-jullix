import {createAction, handleActions} from 'redux-actions';
import {QuizzMode} from "@Models/types/bases/quizzApp/Quizz";

export const setQuizzMode = createAction<QuizzMode>("quizzMode.setQuizzMode");

const initialState = null as QuizzMode;

export const quizzModeReducer = handleActions({
    ["quizzMode.setQuizzMode"]: (state, action) => {
        return action.payload;
    }
}, initialState);
