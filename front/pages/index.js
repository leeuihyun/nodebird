import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const mainPosts = useSelector((state) => state.post.mainPosts);
    return (
        <AppLayout>
            <Head>
                <title>NodeBird</title>
            </Head>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((item) => (
                <PostCard key={item.id} post={item} />
            ))}
        </AppLayout>
    );
};

export default Home;
