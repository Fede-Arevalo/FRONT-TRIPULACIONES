import React, { useState, useRef } from "react";
import axios from "axios";
import "./Chatbot.scss";
import { IoIosNavigate } from "react-icons/io";
import faceChat from "../../assets/circle.png";

function Chatbot() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const messagesRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { comment };
    try {
      const res = await axios.post(
        "https://chatbotapi-production-dbc1.up.railway.app/chat/",
        data
      );
      setComments([
        ...comments,
        { comment: comment, response: res.data.response },
      ]);
      setComment("");
      setTimeout(() => {
        scrollToBottom();
      }, );
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  return (
    <div>
      <div className="chatbot-header">
      <img src={faceChat} alt="Home" className="face-chatbot" />
      Asistencia Virtual</div>
      <div className="chat-container">
        <ul
          className="messages-container"
          ref={messagesRef}
          style={{ overflowY: "scroll", height: "60vh", paddingBottom: "25%" }}>
          {comments.map((c, i) => (
            <li key={i}>
              <div>
                <p className="user-message">{c.comment}</p>
              </div>
              <div>
                <p className="bot-response">{c.response}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form className="formulario-chatbot" onSubmit={handleSubmit}>
        <input
          placeholder="Escribe aquí"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input-chat"
        />
        <button type="submit" className="btn-chat-boot"> <IoIosNavigate/> </button>

        
      </form>
    </div>
  );
}

export default Chatbot;