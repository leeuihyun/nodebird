import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Col, Row } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Router from "next/router";
import useInput from "../hooks/useInput";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const [searchInput, onChangeSearchInput] = useInput("");
    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    }, [searchInput]);
    return (
        <div>
            <Menu mode="horizontal" theme="dark">
                <Menu.Item>
                    <Link href="/">
                        <a>노드버드</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput
                        enterButton
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        onSearch={onSearch}
                    ></SearchInput>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">프로필</Link>
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
                    오른쪽메뉴
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
