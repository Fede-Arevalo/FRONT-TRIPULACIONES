import axios from "axios";

const API_URL = "http://localhost:8000";

const getAllGenres = async () => {
  const res = await axios.get(API_URL + "/genres/getAllGenres");
  return res.data;
};

const genresService = {
  getAllGenres
};

export default genresService;