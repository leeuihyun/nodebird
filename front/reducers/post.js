import { createAction, handleActions } from "redux-actions";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = createAction(ADD_POST_REQUEST, (data) => data);
export const addComment = createAction(ADD_COMMENT_REQUEST, (data) => data);

const dummyPost = {
    id: 2,
    content: "더미데이터입니다.",
    User: {
        id: 1,
        nickname: "Vanc",
    },
    Images: [],
    Comments: [],
};

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
                    content: "리액트의 더미데이터를 이용하는 거군요~",
                },
                {
                    User: {
                        nickname: "second",
                    },
                    content: "리액트란 이런 거구나..!",
                },
            ],
            imagePaths: [],
            addPostLoading: false,
            addPostDone: false,
            addPostError: false,
            addCommentLoading: false,
            addCommentDone: false,
            addCommentError: false,
        },
    ],
};

const post = handleActions(
    {
        [ADD_POST_REQUEST]: (state) => ({
            ...state,
            addPostLoading: true,
            addPostDone: false,
            addPostError: null,
        }),
        [ADD_POST_SUCCESS]: (state) => ({
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
        }),
        [ADD_POST_FAILURE]: (state, action) => ({
            ...state,
            addPostLoading: false,
            addPostDone: false,
            addPostError: action.err,
        }),
        [ADD_COMMENT_REQUEST]: (state) => ({
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: null,
        }),
        [ADD_COMMENT_SUCCESS]: (state) => ({
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            addCommentLoading: false,
            addCommentDone: true,
        }),
        [ADD_COMMENT_FAILURE]: (state, action) => ({
            ...state,
            addCommentLoading: false,
            addCommentDone: false,
            addCommentError: action.err,
        }),
    },
    initialState
);

export default post;
