import React, { useState, useCallback } from "react";
import { Card, Button, Avatar, Popover, List, Comment } from "antd";
import PropTypes from "prop-types";
import {
    RetweetOutlined,
    HeartTwoTone,
    HeartOutlined,
    MessageOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";
import FollowButton from "./FollowButton";

import { useSelector, useDispatch } from "react-redux";
import { REMOVE_POST_REQUEST } from "../reducers/post";

const CardWrapper = styled.div`
    margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.user?.id);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [liked, setLiked] = useState(false);
    const { removePostLoading } = useSelector((state) => state.post);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const onClickRemove = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    return (
        <CardWrapper key={post.id}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone
                            twoToneColor="#eb2f96"
                            key="heart"
                            onClick={onToggleLike}
                        />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),
                    <MessageOutlined key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button
                                            type="danger"
                                            onClick={onClickRemove}
                                            loading={removePostLoading}
                                        >
                                            삭제
                                        </Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </Button.Group>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={user && <FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={
                                        <Avatar>{item.User.nickname[0]}</Avatar>
                                    }
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </CardWrapper>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default PostCard;
