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
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
} from "../reducers/post";

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
function addPostApi(data) {
    return axios.post("/post", data);
}
function addCommentApi(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}
function removePostApi(data) {
    return axios.delete(`/post/${data}`);
}
function loadPostsApi(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}
function loadPostApi(data) {
    return axios.get(`/post/${data}`);
}
function likePostApi(data) {
    return axios.patch(`/post/${data}/like`);
}
function unlikePostApi(data) {
    return axios.delete(`/post/${data}/unlike`);
}
function uploadImagesApi(data) {
    return axios.post("/post/images", data);
}
function retweetApi(data) {
    return axios.post(`/post/${data}/retweet`);
}
function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}
function loadHashtagPostsAPI(data, lastId) {
    return axios.get(
        `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
    );
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
        const res = yield call(removePostApi, action.data);
        //yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: res.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* loadPosts(action) {
    try {
        const res = yield call(loadPostsApi, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: res.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}
function* likePost(action) {
    try {
        const res = yield call(likePostApi, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LIKE_POST_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* unlikePost(action) {
    try {
        const res = yield call(unlikePostApi, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: error.response.data,
        });
    }
}

function* uploadImages(action) {
    try {
        const res = yield call(uploadImagesApi, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: error.response.data,
        });
    }
}
function* retweet(action) {
    try {
        const res = yield call(retweetApi, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: res.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: RETWEET_FAILURE,
            error: error.response.data,
        });
    }
}
function* loadPost(action) {
    try {
        const res = yield call(loadPostApi, action.data);
        console.log("액션데이터");
        console.log(action.data);
        console.log("서버데이터");
        console.log(res.data);
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
function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}
function* loadHashtagPosts(action) {
    try {
        const result = yield call(
            loadHashtagPostsAPI,
            action.data,
            action.lastId
        );
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
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
function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
export default function* postSaga() {
    yield all([
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts),
        fork(watchUploadImages),
        fork(watchRetweet),
        fork(watchLoadPost),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
    ]);
}
