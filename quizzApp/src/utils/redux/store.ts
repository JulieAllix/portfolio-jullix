import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger';
import {load as loadLocalStorage, save as saveLocalStorage} from 'redux-localstorage-simple';

import {User} from "@Models/types/bases/quizzApp/User";
import {userReducer} from "@Utils/redux/reducers/user";

const localStorageConfig = {
    namespace: "quizzApp",
    states: [
        "user",
    ]
};

export interface State {
    user: User,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware:[
        thunk,
        createLogger(),
        saveLocalStorage(localStorageConfig)
    ],
    preloadedState: loadLocalStorage(localStorageConfig), // Initial state
});
