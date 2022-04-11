import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/NickNameEditForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import FollowList from "../components/FollowList";
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_MY_INFO_REQUEST,
} from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        });
    }, []);
    useEffect(() => {
        if (!(user && user.id)) {
            Router.push("/");
        }
    }, [user && user.id]);

    if (!user) {
        return null;
    }
    return (
        <>
            <Head>
                <title>프로필 | Nodebird</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="팔로잉" data={user.Followings} />
                <FollowList header="팔로우" data={user.Followers} />
            </AppLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        const cookie = context.req ? context.req.headers.cookie : "";
        axios.defaults.headers.Cookie = "";
        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie;
        }
        console.log(context);
        context.store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();
    }
); //홈 보다 먼저 실행되는 서버사이드렌더링
export default Profile;
