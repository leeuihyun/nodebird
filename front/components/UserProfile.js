import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";

function UserProfile() {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(logoutAction());
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
            <Card.Meta avatar={<Avatar>VC</Avatar>} title="Vanc" />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
