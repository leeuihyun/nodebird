import axios from "axios";
import { delay, call, all, fork, put, takeLatest } from "redux-saga/effects";
import {
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
} from "../reducers/user";

function logInApi() {
    return axios.post("/api");
}
function* logIn(action) {
    //const res = yield call(logInApi, action.data);
    try {
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function logOutApi() {
    return axios.post("/api");
}
function* logOut(action) {
    //const res = yield call(logOutApi, action.data);
    try {
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOG_OUT_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function signUpApi() {
    return axios.post("/api");
}
function* signUp(action) {
    //const res = yield call(signUpApi, action.data);
    try {
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: SIGN_UP_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function followApi() {
    return axios.post("/api");
}
function* follow(action) {
    //const res = yield call(signUpApi, action.data);
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: FOLLOW_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function unfollowApi() {
    return axios.get(`/api`);
}
function* unfollow(action) {
    try {
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: UNFOLLOW_FAILURE,
            data: error.response.data,
        });
    }
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ]);
}
