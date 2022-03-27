import React, { useState, useCallback } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
    color: red;
`;
const Signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [nickname, onChangeNickname] = useInput("");
    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    const [term, setTerm] = useState("");
    const [termError, setTermError] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    });
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password); //error가 true면 에러 표시.
        },
        [password]
    );
    const onSubmitForm = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password },
        });
    }, [password, passwordCheck, term]);
    return (
        <>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmitForm}>
                    <div>
                        <label htmlFor="nickname">닉네임</label>
                        <Input
                            name="nickname"
                            required
                            onChange={onChangeNickname}
                            value={nickname}
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="email">이메일</label>
                        <Input
                            name="email"
                            required
                            onChange={onChangeEmail}
                            value={email}
                            type="email"
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <Input
                            name="password"
                            required
                            onChange={onChangePassword}
                            value={password}
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="passwordCheck">비밀번호확인</label>
                        <Input
                            name="passwordCheck"
                            required
                            onChange={onChangePasswordCheck}
                            value={passwordCheck}
                        ></Input>
                        {passwordError && (
                            <ErrorMessage>
                                비밀번호가 일치하지 않습니다.
                            </ErrorMessage>
                        )}
                    </div>
                    <div>
                        <Checkbox
                            name="user-term"
                            checked={term}
                            onChange={onChangeTerm}
                        >
                            약관에 동의합니다.
                        </Checkbox>
                        {termError && (
                            <ErrorMessage>약관에 동의해주세요.</ErrorMessage>
                        )}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={signUpLoading}
                        >
                            회원가입
                        </Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    );
};

export default Signup;
