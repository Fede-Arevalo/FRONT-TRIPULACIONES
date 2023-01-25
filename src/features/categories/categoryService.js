import axios from "axios";

const API_URL = "https://back-tripulaciones-production-e793.up.railway.app/";

const getAllCategories = async () => {
  const res = await axios.get(API_URL + "/categories/getAllCategory");
  return res.data;

};

const categoryService = {
    getAllCategories
};

export default categoryService