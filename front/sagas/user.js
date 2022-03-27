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
} from "../reducers/user";

import axios from "axios";

function logInApi(data) {
    return axios.post("/login/api");
}
function logOutApi(data) {
    return axios.post("/login/api");
}
function signUpApi(data) {
    return axios.post("/signup/api");
}

//login
function* logIn(action) {
    try {
        //const res = yield call(logInApi, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            //payload: res.data,
        });
    } catch (err) {
        console.log(err);
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

function* logOut(action) {
    try {
        //const res = yield call(logoutApi, action.data);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            //payload: res.data,
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
        //const res = yield call(signUpApi, action.payload);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            //payload: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
export default function* userSaga() {
    yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
