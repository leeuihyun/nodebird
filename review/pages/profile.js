import AppLayout from "../components/Applayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로우" data={user.Followers} />
            <FollowList header="팔로잉" data={user.Followings} />
        </AppLayout>
    );
};
export default Profile;
