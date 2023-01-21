import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [comment, setComment] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { comment };
    try {
      const res = await axios.post('https://cors-anywhere.herokuapp.com/https://chatbotapi-production-dbc1.up.railway.app/chat/', data);
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Enviar</button>
      <p>{response}</p>
    </form>
  );
}

export default Chatbot;
