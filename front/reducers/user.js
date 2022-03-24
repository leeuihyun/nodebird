import { createAction, handleActions } from "redux-actions";

const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const loginRequest = createAction(LOG_IN_REQUEST, (data) => data);
export const logoutRequest = createAction(LOG_OUT_REQUEST);

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    istLoggingOut: false,
    user: null,
    signUpdata: {},
    loginData: {},
};

const user = handleActions(
    {
        [LOG_IN_REQUEST]: (state, action) => ({
            ...state,
            isLoggingIn: true,
            user: action.payload,
        }),
        [LOG_IN_SUCCESS]: (state, action) => ({
            ...state,
            isLoggingIn: false,
            isLoggedIn: true,
            user: action.payload,
        }),
        [LOG_IN_FAILURE]: (state) => ({
            ...state,
            isLoggingIn: false,
        }),
        [LOG_OUT_REQUEST]: (state) => ({
            ...state,
            isLoggingOut: true,
            user: null,
        }),
        [LOG_OUT_SUCCESS]: (state, action) => ({
            ...state,
            isLoggedIn: false,
            isLoggingOut: false,
            user: action.payload,
        }),
        [LOG_OUT_FAILURE]: (state) => ({
            ...state,
            isLoggingOut: false,
        }),
    },
    initialState
);

export default user;
