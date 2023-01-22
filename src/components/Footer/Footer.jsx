import React from "react";
import { Link, useLocation } from "react-router-dom";
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

  let location = useLocation();

  return (
    <div className="footer">
      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/" ? (
        <nav>
          <div className="inicio">
            <Link to="/wellcome">
              <HomeOutlined />
            </Link>
            inicio
          </div>
          <>
            {user ? (
              <>
                <div className="chat">
                  <Link to="/chatbot">
                    <CommentOutlined />
                  </Link>
                  Chat
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Footer;
