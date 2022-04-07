import React, { useMemo, useCallback, useState } from "react";
import { Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

function NickNameEditForm() {
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState("");
    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, []);
    const onSubmitForm = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
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
                onSearch={onSubmitForm}
            />
        </Form>
    );
}

export default NickNameEditForm;
