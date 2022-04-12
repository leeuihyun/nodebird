import React, { useCallback, useState } from "react";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import Link from "next/link";

const DivBox = styled.div`
    margin-top: 10px;
`;
function LoginForm({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);
    const onSubmitForm = useCallback(
        (e) => {
            //onFinish = e.preventDefault() 가 이미 적용되어있음~!
            if (email && password) {
                setIsLoggedIn(true);
            }
        },
        [email, password]
    );
    return (
        <Form onFinish={onSubmitForm}>
            <div>
                <label htmlFor="email">이메일</label>
                <br />
                <Input
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <br />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <DivBox>
                <Button type="primary" htmlType="submit">
                    로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </DivBox>
        </Form>
    );
}

export default LoginForm;
