import React, { useState, useCallback } from "react";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import {
    EllipsisOutlined,
    HeartOutlined,
    MessageOutlined,
    RetweetOutlined,
    HeartTwoTone,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {
    LIKE_POST_REQUEST,
    REMOVE_POST_REQUEST,
    UNLIKE_POST_REQUEST,
    RETWEET_REQUEST,
} from "../reducers/post";
import FollowButton from "./FollowButton";
import { useEffect } from "react";
import Link from "next/link";
import moment from "moment";

moment.locale("ko");

function PostCard({ post }) {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { removePostLoading, retweetError } = useSelector(
        (state) => state.post
    );
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const id = user && user.id;

    const onLike = useCallback(() => {
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onUnlike = useCallback(() => {
        return dispatch({
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

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert("로그인이 필요합니다.");
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);

    const liked = post.Likers?.find((v) => v.id === id);
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
                title={
                    post.RetweetId
                        ? `${post.User.nickname}님이 리트윗하셨습니다.`
                        : null
                }
                extra={
                    user &&
                    user.id !== post.UserId && (
                        <FollowButton post={post}></FollowButton>
                    )
                }
            >
                {post.RetweetId && post.Retweet ? (
                    <Card
                        cover={
                            post.Retweet.Images[0] && (
                                <PostImages images={post.Retweet.Images} />
                            )
                        }
                    >
                        <div style={{ float: "right" }}>
                            {moment(post.createdAt).format("YYYY.MM.DD")}
                        </div>

                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.Retweet.User.id}`}>
                                    <a>
                                        <Avatar>
                                            {post.Retweet.User.nickname[0]}
                                        </Avatar>
                                    </a>
                                </Link>
                            }
                            title={post.Retweet.User.nickname}
                            description={
                                <PostCardContent
                                    postData={post.Retweet.content}
                                />
                            }
                        />
                    </Card>
                ) : (
                    <>
                        <div style={{ float: "right" }}>
                            {moment(post.createdAt).format("YYYY.MM.DD")}
                        </div>
                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.User.id}`}>
                                    <a>
                                        <Avatar>{post.User.nickname[0]}</Avatar>
                                    </a>
                                </Link>
                            }
                            title={post.User.nickname}
                            description={
                                <PostCardContent postData={post.content} />
                            }
                        />
                    </>
                )}
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
        Likers: PropTypes.arrayOf(PropTypes.object),
        RetweetId: PropTypes.number,
        Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};
export default PostCard;
