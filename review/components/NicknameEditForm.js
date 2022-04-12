import React, { useState, useMemo, useCallback } from "react";
import { Form, Input } from "antd";

function NicknameEditForm() {
    const [nickname, setNickname] = useState("");
    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, []);
    const style = useMemo(
        () => ({
            marginBottom: "20px",
            boder: "1px solid #d9d9d9",
            padding: "20px",
        }),
        []
    );
    return (
        <Form style={style}>
            <Input.Search
                value={nickname}
                addonBefore="닉네임"
                enterButton="수정"
                onChange={onChangeNickname}
                //onSearch={onSubmitForm}
            />
        </Form>
    );
}

export default NicknameEditForm;
