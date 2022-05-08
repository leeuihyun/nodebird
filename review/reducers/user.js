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

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_TO_ME = "REMOVE_POST_TO_ME";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LAOD_MY_INFO_FAILURE";

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
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
};

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
                draft.user = action.data;
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
        [FOLLOW_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
            }),
        [FOLLOW_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user.Followings.push({ id: action.data }); //action.data === id 로 받을것.
                draft.followLoading = false;
                draft.followDone = true;
            }),
        [FOLLOW_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.followLoading = false;
                draft.followError = action.error;
            }),
        [UNFOLLOW_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.unfollowLoading = true;
                draft.unfollowDone = false;
                draft.unfollowError = null;
            }),
        [UNFOLLOW_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user.Followings = draft.user.Followings.filter(
                    (v) => v.id !== action.data
                );
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
            }),
        [UNFOLLOW_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
            }),
        [ADD_POST_TO_ME]: (state, action) =>
            produce(state, (draft) => {
                draft.user.Posts.unshift(action.data);
            }),
        [REMOVE_POST_TO_ME]: (state, action) =>
            produce(state, (draft) => {
                console.log(1);
                draft.user.Posts = draft.user.Posts.filter(
                    (item) => item !== action.data
                );
            }),
        [LOAD_MY_INFO_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                loadMyInfoLoading = true;
                loadMyInfoDone = false;
                loadMyInfoError = null;
            }),
        [LOAD_MY_INFO_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                loadMyInfoLoading = false;
                loadMyInfoDone = true;
            }),
        [LOAD_MY_INFO_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                loadMyInfoLoading = false;
                loadMyInfoError = action.error;
            }),
    },
    initialState
);

export default user;
