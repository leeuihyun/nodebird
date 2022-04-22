import axios from "axios";
import { delay, call, all, fork, put, takeLatest } from "redux-saga/effects";
import {
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
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

export default function* userSaga() {
    yield all([fork(watchLogIn), fork(watchLogOut)]);
}
