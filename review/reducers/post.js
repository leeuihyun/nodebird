import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import shortId from "shortid";
import faker from "faker";

const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMoreData: false,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
};

export const generateDummyData = (number) =>
    Array(number)
        .fill()
        .map((v, i) => ({
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.paragraph(),
            Images: [
                {
                    src: faker.image.image(),
                },
            ],
            Comments: [
                {
                    User: {
                        id: shortId.generate(),
                        nickname: faker.name.findName(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
        }));

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: data.content.User.id,
        nickname: data.content.User.nickname,
    },
    content: data.content.content,
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    User: {
        id: data.User.id,
        nickname: data.User.nickname,
    },
    content: data.content,
});
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

const post = handleActions(
    {
        [ADD_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
            }),
        [ADD_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
            }),
        [ADD_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.addPostLoading = false;
                draft.addPostError = action.error;
            }),
        [ADD_COMMENT_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
            }),
        [ADD_COMMENT_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                const post = draft.mainPosts.find(
                    (v) => v.id === action.data.id
                );
                post.Comments.unshift(dummyComment(action.data));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                draft.addCommentError = null;
            }),
        [ADD_COMMENT_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.addCommentError = action.data.error;
                draft.addCommentLoading = false;
            }),
        [REMOVE_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
            }),
        [REMOVE_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.mainPosts = draft.mainPosts.filter(
                    (v) => v.id !== action.data
                );
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.removePostError = null;
            }),
        [REMOVE_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.removePostError = action.data.error;
                draft.removePostLoading = false;
            }),
        [LOAD_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
            }),
        [LOAD_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMoreData =
                    action.data.concat(draft.mainPosts).length < 50;
                console.log(action.data.concat(draft.mainPosts).length);
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.loadPostError = null;
            }),
        [LOAD_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.loadPostError = action.data.error;
                draft.loadPostLoading = false;
            }),
    },
    initialState
);

export default post;
