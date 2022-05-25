//제너레이터(function뒤에 *)
import userSaga from "./user";
import axios from "axios";
import postSaga from "./post";
import { all, fork } from "redux-saga/effects";
import { backUrl } from "../config/config";
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(userSaga), fork(postSaga)]);
}
