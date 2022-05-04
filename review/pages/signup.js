import AppLayout from "../components/Applayout";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import { useState, useCallback } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

const ErrorMessage = styled.div`
    color: red;
`;
const Signup = () => {
    const { signUpDone, signUpLoading } = useSelector((state) => state.user);
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
    useEffect(() => {
        if (signUpDone) {
            Router.push("/");
        }
    }, [signUpDone]);

    const onSubmitForm = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        alert("회원가입완료!");
    }, [email, password, passwordCheck, term]);
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
                            type="password"
                            name="password"
                            required
                            onChange={onChangePassword}
                            value={password}
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="passwordCheck">비밀번호확인</label>
                        <Input
                            type="password"
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
