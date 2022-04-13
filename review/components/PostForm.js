import React, { useState, useCallback, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

function PostForm() {
    const dispatch = useDispatch();
    const { imagePaths } = useSelector((state) => state.post);
    const [text, setText] = useState("");
    const imageRef = useRef(); //실제 dom에 접근
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const onSubmitForm = useCallback(() => {
        dispatch({
            type: ADD_POST_REQUEST,
            data: text,
        });
        setText("");
    }, []);
    const onClickImageUpload = useCallback(() => {
        imageRef.current.click();
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
                maxLength={148}
                placeholder="Write yourt today"
            />
            <div>
                <input type="file" multiple hidden ref={imageRef} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    htmlType="submit"
                >
                    업로드
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
