/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FormOutlined,
  MoreOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Spin, Dropdown, Space } from "antd";
import "./UserInfo.scss";
import { logout } from "../../../features/auth/authSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  if (!user) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const items = [
    {
      label: (
        <a href={"/UpdateUser/" + user._id}>
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
        <Link to={"/UpdateUser/" + user._id}>
          <Avatar
            size={180}
            src={"http://localhost:8080/" + user.imageUser}
            alt={user.name}
          />
        </Link>
        <h1>{user.name}</h1>
        <div className="icons">
          <p>
            <FormOutlined /> {user.incidents?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
