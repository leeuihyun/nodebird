import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../reducers/user";

function UserProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const onLogout = useCallback(() => {
        dispatch(logoutRequest());
    }, []);
    return (
        <Card
            actions={[
                <div key="twit">
                    짹짹
                    <br />8
                </div>,
                <div key="following">
                    짹짹
                    <br />0
                </div>,
                <div key="follower">
                    짹짹
                    <br />0
                </div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user?.nickname[0]}</Avatar>}
                title={user?.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
