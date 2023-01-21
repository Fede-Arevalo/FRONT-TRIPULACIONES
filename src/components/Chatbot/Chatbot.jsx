import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { askQuestion } from '../../features/chatbot/chatbotService';


function Chatbot() {
  const [question, setQuestion] = useState('');
  const response = useSelector(state => state.chatbot.response);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(askQuestion({ question }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type="submit">Enviar</button>
      <p>Respuesta: {response}</p>
    </form>
  );
}

export default Chatbot;

