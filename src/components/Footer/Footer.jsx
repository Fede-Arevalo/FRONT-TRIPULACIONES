import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";
import Home from "../../assets/home.png";
import Chat from "../../assets/Chat.png";
import User from "../../assets/User.png";
import { Modal } from "antd";
import Chatbot from "../Chatbot/Chatbot";

const Footer = () => {
  let location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
            <img
              src={Chat}
              alt="Chat"
              className="icon-chat"
              onClick={handleClick}
            />
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
      <Modal
        title="Asistencia Virtual"
        visible={isModalVisible}
        onCancel={handleCancel}
        wrapClassName={
          isModalVisible ? "animated-modal-up" : "animated-modal-down"
        }>
        <Chatbot />
      </Modal>
    </div>
  );
};

export default Footer;
