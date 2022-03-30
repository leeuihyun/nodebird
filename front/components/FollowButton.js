import React, { useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

function FollowButton({ post }) {
    const dispatch = useDispatch();
    const { user, followLoading, unFollowLoading } = useSelector(
        (state) => state.user
    );
    const isFollowing =
        user && user.Followings.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    });

    return (
        <>
            <Button
                loading={followLoading || unFollowLoading}
                onClick={onClickButton}
            >
                {isFollowing ? "언팔로우" : "팔로우"}
            </Button>
        </>
    );
}

export default FollowButton;
