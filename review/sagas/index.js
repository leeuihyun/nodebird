import userSaga from "./user";
import postSaga from "./post";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([fork(userSaga), fork(postSaga)]);
}
