import {User} from "../../../../../models/types/bases/quizzApp/User";
import {createAction, handleActions} from 'redux-actions';

export const setUser = createAction<User>("user.setUser");

const initialState = null as User;

export const userReducer = handleActions({
    ["user.setUser"]: (state, action) => {
        return action.payload;
    }
}, initialState);
