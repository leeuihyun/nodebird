import { takeLatest, call, put, fork, all, delay } from "redux-saga/effects";
import axios from "axios";

function addPostApi(data) {
    return axios.post("./post/api", data);
}

function* addPost(action) {
    try {
        //const res = yield call(addPostApi, action.payload);
        yield delay(1000);
        yield put({
            type: "ADD_POST_SUCCESS",
            //payload: res.data;
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: "ADD_POST_FAILURE",
            payload: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest("ADD_POST_REQUEST", addPost);
}
export default function* postSaga() {
    yield all([fork(watchAddPost)]);
}
