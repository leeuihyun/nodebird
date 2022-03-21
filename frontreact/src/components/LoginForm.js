import React, { useState, useCallback } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;
function LoginForm({ setLoggedIn }) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const onSubmitForm = useCallback(() => {
        console.log(id, pw);
        setLoggedIn(true);
    }, [id, pw]);
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const onChangePw = useCallback((e) => {
        setPw(e.target.value);
    }, []);
    return (
        <Form onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <Input
                    name="user-id"
                    onChange={onChangeId}
                    value={id}
                    required
                ></Input>
            </div>
            <div>
                <label htmlFor="user-pw">비밀번호</label>
                <Input
                    name="user-pw"
                    value={pw}
                    onChange={onChangePw}
                    required
                ></Input>
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>
                    로그인
                </Button>
                <Link to="/signup">
                    <Button>회원가입</Button>
                </Link>
            </ButtonWrapper>
        </Form>
    );
}

export default LoginForm;
