import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

function UserProfile({ setIsLoggedIn }) {
    const onClick = useCallback(() => {
        setIsLoggedIn(false);
    }, []);
    return (
        <Card
            actions={[
                <div key="twit">
                    짹짹
                    <br />8
                </div>,
                <div key="following">
                    팔로잉
                    <br />0
                </div>,
                <div key="follower">
                    팔로워
                    <br />0
                </div>,
            ]}
        >
            <Card.Meta avatar={<Avatar>Vc</Avatar>} title="Vanc" />
            <Button onClick={onClick}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
