import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";

function CommentForm({ post }) {
    //const id = useSelector((state) => state.user.user?.id);
    const [commentText, onChangeCommentText] = useInput("");

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);
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
