import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";
import {
    ADD_POST_REQUEST,
    UPLOAD_IMAGES_REQUEST,
    REMOVE_IMAGES_REQUEST,
} from "../reducers/post";

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
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append("image", p);
        });
        formData.append("content", text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text]);
    const imageRef = useRef();

    const onChangeImages = useCallback((e) => {
        console.log("images", e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append("image", f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageRef.current?.click();
    }, [imageRef.current]);

    const onRemove = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGES_REQUEST,
            data: index,
        });
    });
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
                placeholder="Write Your Today~"
            ></Input.TextArea>
            <div>
                <input
                    type="file"
                    name="image"
                    multiple
                    hidden
                    ref={imageRef}
                    onChange={onChangeImages}
                />
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
                    imagePaths.map((item, i) => (
                        <div key={item} style={{ display: "inline-block" }}>
                            <img
                                src={`http://localhost:3065/${item}`}
                                style={{ width: "200px" }}
                                alt={item}
                            />
                            <div>
                                <Button onClick={onRemove(i)}>제거</Button>
                            </div>
                        </div>
                    ))}
            </div>
        </Form>
    );
}

export default PostForm;
