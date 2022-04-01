import React from "react";
import { Form, Input, Button } from "antd";
import { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;
function LoginForm() {
    const [email, onChangeEmail, setEmail] = useInput("");
    const [password, onChangePassword, setPassword] = useInput("");
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);
    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                email,
                password,
            },
        });
    }, [email, password]);
    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">email</label>
                <br />
                <Input
                    name="user-email"
                    value={email}
                    type="email"
                    onChange={onChangeEmail}
                    required
                ></Input>
            </div>
            <div>
                <label htmlFor="user-password">password</label>
                <br />
                <Input
                    type="password"
                    name="user-password"
                    value={password}
                    onChange={onChangePassword}
                    required
                ></Input>
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>
                    로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginForm;
