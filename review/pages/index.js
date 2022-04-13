import AppLayout from "../components/Applayout";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
    const { user } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);

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
