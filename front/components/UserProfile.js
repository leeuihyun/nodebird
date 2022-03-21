import React from "react";
import { Card, Avatar, Button } from "antd";

function UserProfile() {
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
            <Button>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
