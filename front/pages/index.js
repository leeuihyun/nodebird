import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost, loadPostsLoading, retweetError } =
        useSelector((state) => state.post);
    useEffect(() => {
        if (retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);
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
                if (hasMorePost && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id; //없으면 undefined
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePost, loadPostsLoading, mainPosts]);
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
        context.store.dispatch({
            type: LOAD_POSTS_REQUEST,
        });
        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();
    }
); //홈 보다 먼저 실행되는 서버사이드렌더링

export default Home;
