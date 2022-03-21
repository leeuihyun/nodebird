import { Row, Col, Menu, Input } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;
const AppLayout = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(null);
    return (
        <div>
            <Menu mode="horizontal" theme="dark">
                <Menu.Item key="nodebird">
                    <Link to="/">노드버드</Link>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link to="/signup">회원가입</Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton></SearchInput>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {loggedIn ? (
                        <UserProfile></UserProfile>
                    ) : (
                        <LoginForm setLoggedIn={setLoggedIn}></LoginForm>
                    )}
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

export default AppLayout;
