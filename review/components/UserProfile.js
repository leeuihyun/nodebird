import React, { useCallback, useEffect } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../../front/reducers/user";

function UserProfile() {
    const dispatch = useDispatch();
    const { logOutLoading } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.user);

    const onClick = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    useEffect(() => {}, []); //logout ?

    return (
        <Card
            actions={[
                <div key="twit">
                    게시글
                    <br />
                    {user.Posts.length}
                </div>,
                <div key="following">
                    팔로잉
                    <br />
                    {user.Followings.length}
                </div>,
                <div key="follower">
                    팔로워
                    <br />
                    {user.Followers.length}
                </div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title="Vanc"
            />
            <Button onClick={onClick} loading={logOutLoading}>
                로그아웃
            </Button>
        </Card>
    );
}

export default UserProfile;
