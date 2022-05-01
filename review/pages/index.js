import AppLayout from "../components/Applayout";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_POST_REQUEST } from "../reducers/post";

const Home = () => {
    const { user } = useSelector((state) => state.user);
    const { mainPosts, hasMoreData, loadPostLoading } = useSelector(
        (state) => state.post
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: LOAD_POST_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 500
            ) {
                if (hasMoreData && !loadPostLoading) {
                    dispatch({
                        type: LOAD_POST_REQUEST,
                    });
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMoreData, loadPostLoading]);
    return (
        <AppLayout>
            {user && <PostForm />}
            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
            ))}
        </AppLayout>
    );
};

export default Home;
