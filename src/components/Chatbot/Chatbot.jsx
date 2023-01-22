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