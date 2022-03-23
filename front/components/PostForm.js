import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

function PostForm() {
    const [text, onChangeText] = useState("");
    const { imagePaths } = useSelector((state) => state.post);
    const onSubmitForm = useCallback(() => {});

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
                <Input type="file" multiple hidden></Input>
                <Button>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    htmlType="submit"
                >
                    짹짹
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
