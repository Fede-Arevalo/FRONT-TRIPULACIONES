import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  UserOutlined,
  HomeOutlined,
  CommentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="footer">
      <nav>
        <div className="inicio">
          <Link to="/">
            <HomeOutlined />
          </Link>
          inicio
        </div>
        <>
          {user ? (
            <>
              <div className="habito">
                <Link to="/addPost">
                  <CommentOutlined />
                </Link>
                Habito
              </div>
              <div className="perfil">
                <Link to="/profile">
                  <UserOutlined />
                </Link>
                Perfil
              </div>
              {user.user.role === "admin" ? (
                <div className="admin">
                  <Link to="/admin">
                    <DeleteOutlined />
                  </Link>
                  Admin
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div className="perfil">
                <Link to="/login">
                  <UserOutlined />
                </Link>
                Perfil
              </div>
            </>
          )}
        </>
      </nav>
    </div>
  );
};

export default Footer;
