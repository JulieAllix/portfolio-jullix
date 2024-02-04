import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger';
import {load as loadLocalStorage, save as saveLocalStorage} from 'redux-localstorage-simple';

import {CardData} from "@Models/types/bases/quizzApp/Form";
import {QuizzMode} from "@Models/types/bases/quizzApp/Quizz";
import {User} from "@Models/types/bases/quizzApp/User";
import {cardsDataReducer} from "@Utils/redux/reducers/cardsData";
import {quizzModeReducer} from "@Utils/redux/reducers/quizzMode";
import {userReducer} from "@Utils/redux/reducers/user";

const localStorageConfig = {
    namespace: "quizzApp",
    states: [
        "user",
        "quizzMode",
        "cardsData",
    ]
};

export interface State {
    user: User,
    quizzMode: QuizzMode,
    cardsData: CardData[],
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        quizzMode: quizzModeReducer,
        cardsData: cardsDataReducer,
    },
    middleware:[
        thunk,
        createLogger(),
        saveLocalStorage(localStorageConfig)
    ],
    preloadedState: loadLocalStorage(localStorageConfig), // Initial state
});
