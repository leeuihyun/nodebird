import { createAction, handleActions } from "redux-actions";

const ADD_POST = "ADD_POST";
export const addPost = createAction(ADD_POST);

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
            postAdded: false,
        },
    ],
};

const post = handleActions(
    {
        [ADD_POST]: (state) => ({
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            postAdded: true,
        }),
    },
    initialState
);

export default post;
