//제너레이터(function뒤에 *)
import userSaga from "./user";
import axios from "axios";
import postSaga from "./post";
import { all, fork } from "redux-saga/effects";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(userSaga), fork(postSaga)]);
}
