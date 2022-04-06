import React, { useState, useCallback } from "react";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import {
    EllipsisOutlined,
    HeartOutlined,
    MessageOutlined,
    RetweetOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { REMOVE_POST_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";

function PostCard({ post }) {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { removePostLoading } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onUnlike = useCallback(() => {
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onToggleForm = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const id = user && user.id;
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone
                            twoToneColor="#eb2f96"
                            key="heart"
                            onClick={onUnlike}
                        ></HeartTwoTone>
                    ) : (
                        <HeartOutlined
                            key="heart"
                            twoToneColor="#eb2f96"
                            onClick={onLike}
                        />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleForm} />,
                    <Popover
                        key="ellipsis"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button type="primary">수정</Button>
                                        <Button
                                            loading={removePostLoading}
                                            type="danger"
                                            onClick={onRemovePost}
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
                extra={user && <FollowButton post={post}></FollowButton>}
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
                        header={`${
                            post.Comments ? post.Comments.length : 0
                        }개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
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
                    ></List>
                </>
            )}
        </div>
    );
}
PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};
export default PostCard;
