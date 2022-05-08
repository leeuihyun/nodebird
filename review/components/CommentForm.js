import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import PropTypes from "prop-types";

function CommentForm({ post }) {
    const id = useSelector((state) => state.user.user?.id);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const { user } = useSelector((state) => state.user);

    const onSubmitForm = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                content: text,
                PostId: post.id,
                UserId: id,
            },
        });
    }, [text]);
    return (
        <Form onFinish={onSubmitForm}>
            <Form.Item style={{ position: "relative", margin: 0 }}>
                {" "}
                {/*margin : 0 하면 어떻게 되는거지 정확히 ? */}
                <Input.TextArea onChange={onChangeText} value={text} rows={4} />
                <Button type="primary" htmlType="submit">
                    댓글 등록
                </Button>
            </Form.Item>
        </Form>
    );
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}; //검사도구 //service의 안정성을 위해서 귀찮더라도 할 것~!

export default CommentForm;
