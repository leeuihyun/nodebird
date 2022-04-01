import produce from "immer";
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

export const SIGN_UP_RESET = "SIGN_UP_RESET";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const logInRequest = createAction(LOG_IN_REQUEST, (data) => data);
export const logOutRequest = createAction(LOG_OUT_REQUEST);
export const changeNickname = createAction(
    CHANGE_NICKNAME_REQUEST,
    (data) => data
);

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
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unFollowLoading: false,
    unFollowDone: false,
    unFollowError: null,
    user: null,
    signUpdata: {},
    loginData: {},
};

const dummyUser = (data) => ({
    ...data,
    id: 1,
    nickname: "Vanc",
    Posts: [{ id: 1 }],
    Followings: [
        { nickname: "following1" },
        { nickname: "following2" },
        { nickname: "following3" },
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
            logInError: null,
            user: dummyUser(action.payload),
        }),
        [LOG_IN_FAILURE]: (state, action) => ({
            ...state,
            logInLoading: false,
            logInError: action.payload,
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
        [SIGN_UP_REQUEST]: (state, action) => ({
            ...state,
            signUpLoading: true,
            signUpDone: false,
            signUpError: null,
            user: null,
        }),
        [SIGN_UP_SUCCESS]: (state, action) => ({
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
        [CHANGE_NICKNAME_REQUEST]: (state, action) => ({
            ...state,
            changeNicknameLoading: true,
            changeNicknameDone: false,
            changeNicknameError: null,
        }),
        [CHANGE_NICKNAME_SUCCESS]: (state, action) => ({
            ...state,
            changeNicknameLoading: false,
            changeNicknameDone: true,
            changeNicknameError: null,
        }),
        [CHANGE_NICKNAME_FAILURE]: (state, action) => ({
            ...state,
            changeNicknameLoading: true,
        }),
        [ADD_POST_TO_ME]: (state, action) => ({
            ...state,
            user: {
                ...state.user,
                Posts: [{ id: action.data }, ...state.user.Posts],
            },
        }),
        [REMOVE_POST_OF_ME]: (state, action) => ({
            ...state,
            user: {
                ...state.user,
                Posts: state.user.Posts.filter(
                    (item) => item.id !== action.data
                ),
            },
        }),
        [FOLLOW_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
            }),
        [FOLLOW_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user.Followings.push({ id: action.data }); //이름 같은 다른 정보도 들어갈 수 있기 때문에 객체로 처음에 설정해놨었음
                draft.followLoading = false;
                draft.followDone = true;
                draft.followError = null;
            }),
        [FOLLOW_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.followLoading = false;
                draft.followDone = false;
                draft.followError = action.error;
            }),
        [UNFOLLOW_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.unFollowLoading = true;
                draft.unFollowDone = false;
                draft.unFollowError = null;
            }),
        [UNFOLLOW_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.user.Followings = draft.user.Followings.filter(
                    (item) => item.id !== action.data
                );
                draft.unFollowLoading = false;
                draft.unFollowDone = true;
                draft.unFollowError = null;
            }),
        [UNFOLLOW_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.unFollowLoading = false;
                draft.unFollowDone = false;
                draft.unFollowError = action.error;
            }),
        [SIGN_UP_RESET]: (state, action) =>
            produce(state, (draft) => {
                draft.signUpDone = false;
                draft.signUpError = null;
                draft.signUpLoading = false;
            }),
    },
    initialState
);

export default user;
