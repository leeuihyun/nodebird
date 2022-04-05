import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
        (state) => state.post
    );
    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        });
        dispatch({
            type: LOAD_POST_REQUEST,
            //data :
        });
    }, []);
    useEffect(() => {
        function onScroll() {
            /* console.log(
                window.scrollY,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight
            );*/
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            )
                if (hasMorePost && !loadPostLoading) {
                    dispatch({
                        type: LOAD_POST_REQUEST,
                    });
                }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePost, loadPostLoading, mainPosts]);
    return (
        <AppLayout>
            <Head>
                <title>NodeBird</title>
            </Head>
            {user && <PostForm />}
            {mainPosts.map((item) => (
                <PostCard key={item.id} post={item} />
            ))}
        </AppLayout>
    );
};

export default Home;
