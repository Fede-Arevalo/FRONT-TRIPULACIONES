/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FormOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CommentOutlined,
  MoreOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Divider, Spin, Dropdown, Space } from "antd";
import "./UserInfo.scss";
import { logout } from "../../../features/auth/authSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const posts = userInfo.postIds;
  const comments = userInfo.commentIds;
  const followers = userInfo.followerIds;
  const following = userInfo.followingIds;

  if (!userInfo) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const items = [
    {
      label: (
        <a href={"/UpdateUser/" + userInfo._id}>
          <EditOutlined /> Edit profile
        </a>
      ),
    },
    {
      label: (
        <Link to="/" onClick={onLogout}>
          <LogoutOutlined /> Log out
        </Link>
      ),
    },
  ];

  return (
    <div className="userInfo">
      <div className="dropdown">
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined style={{ fontSize: "140%" }} />
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="user">
        <Link to={"/UpdateUser/" + userInfo._id}>
          <Avatar
            size={80}
            src={"http://localhost:8080/" + userInfo?.imageUser}
            alt={userInfo.name}
          />
        </Link>
        <h1>{userInfo.name}</h1>
        <div className="icons">
          <p>
            <UsergroupAddOutlined /> {followers?.length}
          </p>
          <p>
            <TeamOutlined /> {following?.length}
          </p>
          <p>
            <FormOutlined /> {posts?.length}
          </p>
          <p>
            <CommentOutlined /> {comments?.length}
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default UserInfo;
