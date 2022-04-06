import { createAction, handleActions } from "redux-actions";
//import shortId from "shortid";
import produce from "immer";
//import faker from "faker";

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

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const addPost = createAction(ADD_POST_REQUEST, (data) => data);
export const addComment = createAction(ADD_COMMENT_REQUEST, (data) => data);
/*
const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "Vanc",
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data.content,
    User: {
        id: 1,
        nickname: "Vanc",
    },
});

export const generateDummyPost = (number) =>
    Array(number)
        .fill()
        .map(() => ({
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
        */
const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePost: true, //게시글을 몇개만 볼지 ?
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
};

const post = handleActions(
    {
        //spreaad 연산자를 이용한 것.
        /*[ADD_POST_REQUEST]: (state, action) => ({
            ...state,
            addPostLoading: true,
            addPostDone: false,
            addPostError: null,
        }),
        [ADD_POST_SUCCESS]: (state, action) => ({
            ...state,
            mainPosts: [dummyPost(action.data), ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
            addPostError: null,
        }),
        [ADD_POST_FAILURE]: (state, action) => ({
            ...state,
            addPostLoading: false,
            addPostDone: false,
            addPostError: action.response.error,
        }),
        [ADD_COMMENT_REQUEST]: (state) => ({
            ...state,
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: null,
        }),
        [ADD_COMMENT_SUCCESS]: (state, action) => {
            //data.content , postId,userId
            const postIndex = state.mainPosts.findIndex(
                (v) => v.id === action.postId
            );
            const post = { ...state.mainPosts[postIndex] };
            const Comments = [dummyComment(action.data), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addCommentLoading: false,
                addCommentDone: true,
            };
        },*/
        [ADD_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
            }),
        [ADD_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.mainPosts.unshift(action.data);
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.addPostError = null;
            }),
        [ADD_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.addPostLoading = false;
                draft.addPostDone = false;
                draft.addPostError = action.error;
            }),
        [ADD_COMMENT_REQUEST]: (state) =>
            produce(state, (draft) => {
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
            }),
        [ADD_COMMENT_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                const post = draft.mainPosts.find(
                    (v) => v.id === action.data.PostId
                );
                post.Comments.unshift(action.data); //unshift 맨앞에 추가하는 것.
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
            }),
        [ADD_COMMENT_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
            }),
        [REMOVE_POST_REQUEST]: (state, action) => ({
            ...state,
            removePostLoading: true,
            removePostDone: false,
            removePostError: null,
        }),
        [REMOVE_POST_SUCCESS]: (state, action) => ({
            ...state,
            mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
            removePostLoading: false,
            removePostDone: true,
            removePostError: null,
        }),
        [REMOVE_POST_FAILURE]: (state, action) => ({
            ...state,
            addPostLoading: false,
            addPostDone: false,
            addPostError: action.error,
        }),
        [LOAD_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
            }),
        [LOAD_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.hasMorePost = action.data.length === 10;
            }),
        [LOAD_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
            }),
        [LIKE_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
            }),
        [LIKE_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                const post = draft.mainPosts.find(
                    (v) => v.id === action.data.PostId
                );
                post.Likers.push({ id: action.data.UserId });
                draft.likePostLoading = false;
                draft.likePostDone = true;
            }),
        [LIKE_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.likePostLoading = false;
                draft.likePostError = action.error;
            }),
        [UNLIKE_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
            }),
        [UNLIKE_POST_SUCCESS]: (state, action) =>
            produce(state, (draft) => {
                const post = draft.mainPosts.find(
                    (v) => v.id === action.data.PostId
                );
                post.Likers = post.Likers.filter(
                    (v) => v.id !== action.data.UserId
                );
                draft.unlikePostLoading = false;
                draft.unlikePostDone = true;
            }),
        [UNLIKE_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
            }),
    },
    initialState
);

export default post;
