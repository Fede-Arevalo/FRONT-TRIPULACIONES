import React, { useState, useRef } from "react";
import axios from "axios";
import "./Chatbot.scss";

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
      }, 0);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  return (
    <div>
      <div className="asistencia-virtual">Asistencia Virtual</div>
      <div className="chat-container">
        <ul
          className="messages-container"
          ref={messagesRef}
          style={{ overflowY: "scroll", height: "70vh" }}>
          {comments.map((c, i) => (
            <li key={i}>
              <p className="user-message">{c.comment}</p>
              <p className="bot-response">{c.response}</p>
            </li>
          ))}
        </ul>
      </div>
      <form className="formulario-chatbot"
       
        onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chatbot;
