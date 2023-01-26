import axios from 'axios';

const Censor = () => {
  const censorText = async (text) => {
    const response = await axios.post('https://web-production-a0fe.up.railway.app/flang/', { speak: text });
    return response.data.text;
  }

  return { censorText };
}

export default Censor;

