import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import shortId from "shortid";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG-IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG-OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

const initialState = {
    user: null,
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: false,
};

const dummyUser = (data) => ({
    id: shortId.generate(),
    email: data.User.email,
    nickname: data.User.nickname,
});
const user = handleActions(
    {
        [LOG_IN_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
            }),
        [LOG_IN_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user = dummyUser(action.data);
                draft.logInLoading = false;
                draft.logInDone = true;
            }),
        [LOG_IN_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.logInLoading = false;
                draft.logInError = action.error;
            }),
        [LOG_OUT_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
            }),
        [LOG_OUT_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user = null;
                draft.logOutLoading = false;
                draft.logOutDone = true;
            }),
        [LOG_OUT_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.logOutLoading = false;
                draft.logOutError = action.error;
            }),
        [SIGN_UP_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
            }),
        [SIGN_UP_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.signUpLoading = false;
                draft.signUpDone = true;
            }),
        [SIGN_UP_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.signUpLoading = false;
                draft.signUpError = action.error;
            }),
    },
    initialState
);

export default user;
