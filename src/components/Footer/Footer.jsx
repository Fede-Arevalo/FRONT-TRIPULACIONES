import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  UserOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="footer">
      <nav>
        <Link to="/">
          <HomeOutlined />
        </Link>
        <>
          {user ? (
            <>
              <Link to="/addPost">
                <PlusSquareOutlined />
              </Link>
              <Link to="/profile">
                <UserOutlined />
              </Link>
              {user.user.role === "admin" ? (
                <Link to="/admin">
                  <DeleteOutlined />
                </Link>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <UserOutlined />
              </Link>
            </>
          )}
        </>
      </nav>
    </div>
  );
};

export default Footer;
