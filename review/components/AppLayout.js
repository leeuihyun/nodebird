import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import twitImage from "../img/twit1.jpeg";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

const TwitBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;
function AppLayout({ children }) {
    const { user } = useSelector((state) => state.user);
    return (
        <>
            <TwitBox>
                <img src={twitImage} alt="twitImage" width={120} height={100} />
            </TwitBox>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/">
                        <a>홈</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">
                        <a>프로필</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search
                        enterButton
                        style={{ verticalAlign: "middle" }}
                    />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {user ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    right
                </Col>
            </Row>
        </>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppLayout;
