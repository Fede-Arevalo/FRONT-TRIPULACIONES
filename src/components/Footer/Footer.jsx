import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";
import Home from "../../assets/home.png";
import Chat from "../../assets/Chat.png";
import User from "../../assets/User.png";

const Footer = () => {
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
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default Footer;
