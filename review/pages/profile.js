import AppLayout from "../components/Applayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
const Profile = () => {
    const followerList = [
        { nickname: "lee" },
        { nickname: "vanc" },
        { nickname: "su" },
    ];
    const followingList = [
        { nickname: "han" },
        { nickname: "pang" },
        { nickname: "mr" },
    ];
    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로우" data={followerList} />
            <FollowList header="팔로잉" data={followingList} />
        </AppLayout>
    );
};
export default Profile;
