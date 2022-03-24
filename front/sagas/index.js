//제너레이터(function뒤에 *)
import userSaga from "./user";
import postSaga from "./post";
import { all, fork } from "redux-saga";

export default function* rootSaga() {
    yield all([fork(userSaga), fork(postSaga)]);
}
