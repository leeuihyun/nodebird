import axios from "axios";
import { delay, all, fork, put, takeLatest, call } from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    generateDummyData,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from "../reducers/user";
import shortId from "shortid";

function addPostApi(data) {
    axios.post("/post", { content: data });
}
function* addPost(action) {
    try {
        const res = yield call(addPostApi, action.data);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: res.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: ADD_POST_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function addCommentApi(data) {
    axios.post(`/post/${data.PostId}/comment`, data);
}

function* addComment(action) {
    try {
        const res = yield call(addCommentApi, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: error.response.data,
        });
    }
}
function removePostApi() {
    axios.post("/api");
}
function* removePost(action) {
    try {
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_TO_ME,
            data: action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadPostApi() {
    axios.post("/posts", data);
}
function* loadPost(action) {
    try {
        const res = yield call(loadPostApi, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_POST_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPost),
    ]);
}
