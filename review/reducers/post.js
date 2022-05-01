import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import shortId from "shortid";

const initialState = {
    mainPosts: [
        {
            id: "daf12sa",
            User: {
                id: 1,
                nickname: "vanc",
            },
            content: "first post",
            Images: [
                {
                    src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
                },
                {
                    src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
                },
                {
                    src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
                },
            ],
            Comments: [
                {
                    User: {
                        nickname: "nero",
                    },
                    content: "우와 처음이에요~",
                },
                {
                    User: {
                        nickname: "mu",
                    },
                    content: "우와 두번째에요~",
                },
                {
                    User: {
                        nickname: "su",
                    },
                    content: "우와 세번째에요~",
                },
            ],
        },
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
};

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
    },
    initialState
);

export default post;
