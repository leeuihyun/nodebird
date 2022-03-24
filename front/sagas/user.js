import { takeLatest, put, call, delay, fork, all } from "redux-saga";

import axios from "axios";

function loginApi(data) {
    return axios.post("/login/api");
}
function logoutApi(data) {
    return axios.post("/login/api");
}
//login
function* login(action) {
    try {
        //const res = yield call(loginApi, action.data);
        yield delay(1000);
        yield put({
            type: "LOG_IN_SUCCESS",
            //payload: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: "LOG_IN_FAILURE",
            payload: err.response.data,
        });
    }
}

function* watchLogin() {
    yield takeLatest("LOG_IN_REQUEST", login);
}
//logout

function* logout(action) {
    try {
        //const res = yield call(logoutApi, action.data);
        yield delay(1000);
        yield put({
            type: "LOG_OUT_SUCCESS",
            //payload: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: "LOG_OUT_FAILURE",
            payload: err.response.data,
        });
    }
}

function* watchLogout() {
    yield takeLatest("LOG_OUT_REQUEST", logout);
}

export default function* userSaga() {
    yield all([fork(watchLogin), fork(watchLogout)]);
}
