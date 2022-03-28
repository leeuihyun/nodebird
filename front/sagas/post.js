import { takeLatest, call, put, fork, all, delay } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from "../reducers/post";

function addPostApi(data) {
    return axios.post("/api/post", data);
}
function addCommentApi(data) {
    return axios.post(`/api/post/${data.postId}`, data);
}

function* addPost(action) {
    try {
        //const res = yield call(addPostApi, action.payload);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                content: action.data,
            },
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* addComment(action) {
    try {
        //const res = yield call(addCommentApi, action.payload);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([fork(watchAddPost), fork(watchAddComment)]);
}
