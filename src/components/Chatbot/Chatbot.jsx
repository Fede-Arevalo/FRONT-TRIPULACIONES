import React, { useState, useRef } from "react";
import axios from "axios";
import "./Chatbot.css"

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

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { askQuestion } from '../../features/chatbot/chatbotService';
// import { useSelector } from 'react-redux'

// function Chatbot() {
//   const [question, setQuestion] = useState('');
//   const response = useSelector(state => state.chatbot.response);
//   const status = useSelector(state => state.chatbot.status);
//   const error = useSelector(state => state.chatbot.error);
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(askQuestion({ question }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <button type="submit">Enviar</button>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'succeeded' && <p>Respuesta: {response}</p>}
//       {status === 'failed' && <p>Error: {error}</p>}
//     </form>
//   );
// }

// export default Chatbot;
