import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
    const followList = [
        {
            nickname: "제로초",
        },
        {
            nickname: "바보",
        },
        {
            nickname: "재우",
        },
        {
            nickname: "양군",
        },
    ];
    const followerList = [
        {
            nickname: "제로초1",
        },
        {
            nickname: "바보1",
        },
        {
            nickname: "재우1",
        },
        {
            nickname: "양군1",
        },
    ];
    return (
        <>
            <Head>
                <title>프로필 | Nodebird</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="팔로잉 목록" data={followList} />
                <FollowList header="팔로우 목록" data={followerList} />
            </AppLayout>
        </>
    );
};

export default Profile;
