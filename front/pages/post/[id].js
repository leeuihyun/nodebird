import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { useSelector } from "react-redux";
import axios from "axios";
import PostCard from "../../components/PostCard";
import Head from "next/head";
const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);
    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta
                    property="og:title"
                    content={`${singlePost.User.nickname}님의 게시글`}
                />
                <meta property="og:description" content={singlePost.content} />
                <meta
                    property="og:image"
                    content={
                        singlePost.Images[0]
                            ? singlePost.Images[0].src
                            : "https://nodebird.com/favicon.ico"
                    }
                />
                <meta
                    property="og:url"
                    content={`https://nodebird.com/post/${id}`}
                />
            </Head>
            <PostCard post={singlePost}></PostCard>
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
            type: LOAD_POST_REQUEST,
            data: context.params.id,
        });
        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();
    }
); //홈 보다 먼저 실행되는 서버사이드렌더링
export default Post;
