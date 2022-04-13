import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "vanc",
            },
            content: "first post",
            Images: [
                {
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
    postAdded: false,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
};
const dummyPost = {
    id: 2,
    User: {
        id: 2,
        nickname: "vanc",
    },
    content: "더미데이터입니다.",
    Images: [],
    Comments: [],
};
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

const post = handleActions(
    {
        [ADD_POST_REQUEST]: (state, action) =>
            produce(state, (draft) => {
                draft.mainPosts.unshift(dummyPost);
                draft.postAdded = true;
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
            }),
    },
    initialState
);

export default post;
