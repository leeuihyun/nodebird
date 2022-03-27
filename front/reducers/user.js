import { createAction, handleActions } from "redux-actions";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const logInRequest = createAction(LOG_IN_REQUEST, (data) => data);
export const logOutRequest = createAction(LOG_OUT_REQUEST);

const initialState = {
    logInLoading: false, //로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, //로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, //회원가입 시도중
    signUpDone: false, //회원가입 완료
    signUpError: null,
    user: null,
    signUpdata: {},
    loginData: {},
};

const dummyUser = (data) => ({
    ...data,
    nickname: "Vanc",
    Posts: [{ id: 1 }],
    Followings: [
        { nickname: "부기초" },
        { nickname: "Chanho Lee" },
        { nickname: "neue zeal" },
    ],
    Followers: [
        { nickname: "부기초" },
        { nickname: "Chanho Lee" },
        { nickname: "neue zeal" },
    ],
});
const user = handleActions(
    {
        [LOG_IN_REQUEST]: (state, action) => ({
            ...state,
            logInLoading: true,
            logInError: null,
            logInDone: false,
        }),
        [LOG_IN_SUCCESS]: (state, action) => ({
            ...state,
            logInLoading: false,
            logInDone: true,
            user: dummyUser(action.payload),
        }),
        [LOG_IN_FAILURE]: (state) => ({
            ...state,
            logInLoading: false,
        }),
        [LOG_OUT_REQUEST]: (state) => ({
            ...state,
            logOutLoading: true,
            logOutError: null,
            logOutDone: false,
            user: null,
        }),
        [LOG_OUT_SUCCESS]: (state) => ({
            ...state,
            logInDone: false,
            logOutLoading: false,
            logOutDone: true,
            user: null,
        }),
        [LOG_OUT_FAILURE]: (state, action) => ({
            ...state,
            logOutLoading: false,
            logoutError: action.error,
        }),
        [SIGN_UP_REQUEST]: (state) => ({
            ...state,
            signUpLoading: true,
            signUpDone: false,
            signUpError: null,
            user: null,
        }),
        [SIGN_UP_SUCCESS]: (state) => ({
            ...state,
            signUpDone: true,
            signUpLoading: false,
            user: null,
        }),
        [SIGN_UP_FAILURE]: (state, action) => ({
            ...state,
            signUpLoading: false,
            signUpError: action.error,
        }),
    },
    initialState
);

export default user;
