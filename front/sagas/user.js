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
    LOAD_USER_REQUEST,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_FAILURE,
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
    return axios.post("/follow/api");
}
function unFollowApi(data) {
    return axios.post("/unfollow/api");
}
function loadUserApi() {
    return axios.get("/user");
}
function changeNicknameApi(data) {
    return axios.patch("/user/nickname", { nickname: data });
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
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
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
        yield delay(1000),
            yield put({
                type: UNFOLLOW_SUCCESS,
                data: action.data,
            });
    } catch (err) {
        console.log(err);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: err.response.data,
        });
    }
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow);
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
            error: error.response.data,
        });
    }
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
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
export default function* userSaga() {
    yield all([
        fork(watchChangeNickname),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadUser),
    ]);
}
