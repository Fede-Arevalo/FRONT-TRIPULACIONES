import React, { useState, useRef } from "react";
import axios from "axios";
import "./Chatbot.scss"

function Chatbot() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentsEndRef = useRef(null);

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
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <ul >
        {comments.map((c, i) => (
          <li key={i}>
            <p className="user-message">{c.comment}</p>
            <p className="bot-response">{c.response}</p>
          </li>
        ))}
        <div ref={commentsEndRef} />
      </ul>
      <form
        style={{
          position: "fixed",
          bottom: 70,
          width: "100%",
          height: "70px",
          background: "white",
          border: "1px solid gray",
        }}
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

