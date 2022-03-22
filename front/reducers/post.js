import { createAction, handleActions } from "redux-actions";

const POST_ACTION = "POST_ACTION";
export const postAction = createAction(POST_ACTION, (post) => post);

const initialState = {
    mainPosts: [],
};

const post = handleActions(
    {
        [POST_ACTION]: (state, action) => ({
            ...state,
            mainPosts: state.mainPosts.concat(action.payload),
        }),
    },
    initialState
);

export default post;
