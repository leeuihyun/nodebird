import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";
import { ADD_POST_REQUEST } from "../reducers/post";

function PostForm() {
    const { addPostDone, imagePaths, addPostLoading } = useSelector(
        (state) => state.post
    );
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput("");
    useEffect(() => {
        if (addPostDone) {
            setText("");
        }
    }, [addPostDone]);
    const onSubmitForm = useCallback(() => {
        if (!text || !text.trim()) {
            return alert("게시글을 작성하세요.");
        }
        return dispatch({
            type: ADD_POST_REQUEST,
            data: text,
        });
    }, [text]);
    const imageRef = useRef();

    const onClickImageUpload = useCallback(() => {
        imageRef.current?.click();
    }, [imageRef.current]);
    return (
        <Form
            style={{ margin: "10px 0 20px" }}
            encType="multipart/form-data"
            onFinish={onSubmitForm}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            ></Input.TextArea>
            <div>
                <input type="file" multiple hidden ref={imageRef} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    htmlType="submit"
                >
                    입력
                </Button>
            </div>
            <div>
                {imagePaths &&
                    imagePaths.map((item) => (
                        <div key={item} style={{ display: "inline-block" }}>
                            <img
                                src={item}
                                style={{ width: "200px" }}
                                alt={item}
                            />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    ))}
            </div>
        </Form>
    );
}

export default PostForm;
