import { delay, all, fork, put } from "redux-saga/effects";
function* watchAddPost() {}
function* watchRemovePost() {}
export default function* postSaga() {
    yield all([fork(watchAddPost), fork(watchRemovePost)]);
}
