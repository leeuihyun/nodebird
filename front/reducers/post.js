import { createAction, handleActions } from "redux-actions";

const ADD_POST = "ADD_POST";
export const addPost = createAction(ADD_POST);

const dummyPost = {
    id: 2,
    content: "dummy",
};

const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "vanc",
            },
            content: "첫 번째 게시글 #해시태그 #익스프레스",
            Images: [
                {
                    src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fkr%2Ffree-icon%2Faddress_3447699&psig=AOvVaw1OwtStOls41BuuGnR_rt1F&ust=1648098595288000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDt0--72_YCFQAAAAAdAAAAABAD",
                },
                {
                    src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fkr%2Ffree-icon%2Faddress_1275192&psig=AOvVaw1OwtStOls41BuuGnR_rt1F&ust=1648098595288000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDt0--72_YCFQAAAAAdAAAAABAJ",
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
