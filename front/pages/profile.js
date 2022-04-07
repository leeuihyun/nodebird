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
} from "../reducers/user";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(user && user.id)) {
            Router.push("/");
        }
    }, [user && user.id]);

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        });
    }, []);
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

export default Profile;
