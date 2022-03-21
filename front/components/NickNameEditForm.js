import React, { useMemo, useCallback } from "react";
import { Form, Input } from "antd";

function NickNameEditForm() {
    const onSubmitForm = useCallback(() => {}, []);
    const style = useMemo(
        () => ({
            marginBottom: "20px",
            boder: "1px solid #d9d9d9",
            padding: "20px",
        }),
        []
    );
    return (
        <Form onFinish={onSubmitForm} style={style}>
            <Input.Search addonBefore="닉네임" enterButton="수정" />
        </Form>
    );
}

export default NickNameEditForm;
