import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

function CommentForm({ post }) {
    const { id } = useSelector((state) => state.user);
    const { addCommentDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [commentText, onChangeCommentText, setComment] = useInput("");
    useEffect(() => {
        if (addCommentDone) {
            setComment("");
        }
    }, [addCommentDone]);
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea
                    onChange={onChangeCommentText}
                    value={commentText}
                    rows={4}
                ></Input.TextArea>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ position: "absolute", right: 0, bottom: -40 }}
                >
                    입력
                </Button>
            </Form.Item>
        </Form>
    );
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;
