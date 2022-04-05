import { takeLatest, call, put, fork, all, delay } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    REMOVE_POST_FAILURE,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_REQUEST,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
function addPostApi(data) {
    return axios.post("/post", { content: data });
}
function addCommentApi(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}
function removePostApi(data) {
    return axios.post(`/post/${data.id}`, data);
}
function loadPostApi(data) {
    return axios.get("/posts", data);
}
function* addPost(action) {
    try {
        const res = yield call(addPostApi, action.data);
        //yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: res.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: res.data.id,
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
        const res = yield call(addCommentApi, action.data);
        //yield delay(1000);
        console.log("here1");
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: res.data,
        });
        console.log("here2");
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

function* removePost(action) {
    try {
        //const res = yield call(removePostApi, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* loadPost(action) {
    try {
        const res = yield call(loadPostApi, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_POST_FAILURE,
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
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPost),
    ]);
}
