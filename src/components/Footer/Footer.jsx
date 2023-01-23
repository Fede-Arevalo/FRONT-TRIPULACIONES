import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Home from "../../assets/home.png";
import Chat from "../../assets/Chat.png";
import User from "../../assets/User.png";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  let location = useLocation();

  return (
    <div className="footer">
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/" ? (
        <nav>
          <div className="inicio">
            <Link to="/wellcome">
              <img src={Home} alt="Home" className="icon-home" />
            </Link>
            inicio
          </div>
          <>
            {user ? (
              <>
                <div className="chat">
                  <Link to="/chatbot">
                    <img src={Chat} alt="Chat" className="icon-chat" />
                  </Link>
                  Chat
                </div>
                <div className="perfil">
                  <Link to="/profile">
                    <img src={User} alt="User" className="icon-user" />
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
