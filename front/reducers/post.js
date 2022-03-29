import { createAction, handleActions } from "redux-actions";
import shortId from "shortid";
import produce from "immer";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const addPost = createAction(ADD_POST_REQUEST, (data) => data);
export const addComment = createAction(ADD_COMMENT_REQUEST, (data) => data);

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

const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "Vanc",
            },
            content: "첫번째 게시물 #해시태그1 #해시태그2",
            Images: [
                {
                    id: shortId.generate(),
                    src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
                },
                {
                    id: shortId.generate(),
                    src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
                },
                {
                    id: shortId.generate(),
                    src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
                },
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "nero",
                    },
                    content: "리액트의 더미데이터를 이용하는 거군요~",
                },
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "second",
                    },
                    content: "리액트란 이런 거구나..!",
                },
            ],
            imagePaths: [],
            addPostLoading: false,
            addPostDone: false,
            addPostError: false,
            removePostLoading: false,
            removePostDone: false,
            removePostError: false,
            addCommentLoading: false,
            addCommentDone: false,
            addCommentError: false,
        },
    ],
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
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.addPostError = null;
            }),
        [ADD_POST_FAILURE]: (state, action) =>
            produce(state, (draft) => {
                draft.addPostLoading = false;
                draft.addPostDone = false;
                draft.addPostError = action.response.data;
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
                    (v) => v.id === action.data.postId
                );
                post.Comments.unshift(dummyComment(action.data)); //unshift 맨앞에 추가하는 것.
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
            }),

        [ADD_COMMENT_FAILURE]: (state, action) => ({
            ...state,
            removeCommentLoading: false,
            removeCommentDone: false,
            removeCommentError: action.err,
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
            addPostError: action.response.error,
        }),
    },
    initialState
);

export default post;
