import React from "react";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

function FollowList({ header, data }) {
    const dispatch = useDispatch();

    const onClickButton = (id) => () => {
        if (header === "팔로잉") {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            });
        } else {
            dispatch({
                type: REMOVE_FOLLOWER_REQUEST,
                data: id,
            });
        }
    };
    return (
        <List
            style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            header={<div>{header}</div>}
            loadMore={
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                    <Button>더 보기</Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card
                        actions={[
                            <StopOutlined
                                key="stop"
                                onClick={onClickButton(item.id)}
                            />,
                        ]}
                    >
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default FollowList;
