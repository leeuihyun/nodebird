import { takeLatest, put, call, delay, fork, all } from "redux-saga/effects";
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    SIGN_UP_REQUEST,
    FOLLOW_FAILURE,
    FOLLOW_SUCCESS,
    FOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_REQUEST,
    UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_FAILURE,
    LOAD_MY_INFO_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
} from "../reducers/user";

import axios from "axios";

function logInApi(data) {
    return axios.post("/user/login", data);
}
function logOutApi(data) {
    return axios.post("/user/logout");
}
function signUpApi(data) {
    return axios.post("/user", data);
}
function followApi(data) {
    return axios.patch(`/user/${data}/follow`, data);
}
function unFollowApi(data) {
    return axios.delete(`/user/${data}/follow`, data);
}
function loadMyInfoApi() {
    return axios.get("/user");
}
function changeNicknameApi(data) {
    return axios.patch("/user/nickname", { nickname: data });
}
function loadFollowersApi(data) {
    return axios.get(`/user/followers`, data);
}
function loadFollowingsApi(data) {
    return axios.get(`/user/followings`, data);
}
function removeFollowerApi(data) {
    return axios.delete(`/user/follower/${data}`);
}
function loadUserApi(data) {
    return axios.get(`/user/${data}`);
}
//login
function* logIn(action) {
    try {
        const res = yield call(logInApi, action.data);
        //yield delay(1000); // 서버와 연동하기 전 비동기 작업을 구현하기 위함 redux는 동기적이기 때문이다.
        yield put({
            type: LOG_IN_SUCCESS,
            data: res.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
//logout

function* logOut() {
    try {
        yield call(logOutApi);
        //yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* signUp(action) {
    try {
        const res = yield call(signUpApi, action.data);
        console.log(res);
        yield put({
            type: SIGN_UP_SUCCESS,
            //payload: res.data,
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* follow(action) {
    try {
        const res = yield call(followApi, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* unFollow(action) {
    try {
        const res = yield call(unFollowApi, action.data);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data,
        });
    }
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function* loadMyInfo() {
    try {
        const res = yield call(loadMyInfoApi);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* changeNickname(action) {
    try {
        const res = yield call(changeNicknameApi, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* loadFollowers(action) {
    try {
        const res = yield call(loadFollowersApi, action.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* loadFollowings(action) {
    try {
        const res = yield call(loadFollowingsApi, action.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* removeFollower(action) {
    try {
        const res = yield call(removeFollowerApi, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            data: error.response.data,
        }); 
    }
}
function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* loadUser(action) {
    try {
        const res = yield call(loadUserApi, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_USER_FAILURE,
            data: error.response.data,
        });
    }
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
export default function* userSaga() {
    yield all([
        fork(watchRemoveFollower),
        fork(watchChangeNickname),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadMyInfo),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchLoadUser),
    ]);
}
