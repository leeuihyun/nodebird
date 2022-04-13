import { HYDRATE } from "next-redux-wrapper";
import post from "./post";
import user from "./user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        //ssr 을 위한 것.
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    post,
    user,
});

export default rootReducer;
