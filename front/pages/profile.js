import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user && user.id) {
            Router.push("/");
        }
    });
    return (
        <>
            <Head>
                <title>프로필 | Nodebird</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="팔로잉" data={user.FollowList} />
                <FollowList header="팔로우" data={user.Followers} />
            </AppLayout>
        </>
    );
};

export default Profile;
