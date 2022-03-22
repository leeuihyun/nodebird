import { createAction, handleActions } from "redux-actions";

const LOGIN_ACTION = "LOGIN_ACTION";
const LOGOUT_ACTION = "LOGOUT_ACTION";
export const loginAction = createAction(LOGIN_ACTION, (data) => data);
export const logoutAction = createAction(LOGOUT_ACTION);

const initialState = {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
};

const user = handleActions(
    {
        [LOGIN_ACTION]: (state, action) => ({
            ...state,
            isLoggedIn: true,
            user: action.payload,
        }),
        [LOGOUT_ACTION]: (state) => ({
            ...state,
            isLoggedIn: false,
            user: null,
        }),
    },
    initialState
);

export default user;
