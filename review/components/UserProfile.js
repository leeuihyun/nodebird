import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../../front/reducers/user";

function UserProfile() {
    const dispatch = useDispatch();
    const { logOutLoading } = useSelector((state) => state.user);

    const onClick = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
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
            <Button onClick={onClick}>
                {" "}
                {/*loading={logOutLoading} */}
                로그아웃
            </Button>
        </Card>
    );
}

export default UserProfile;
