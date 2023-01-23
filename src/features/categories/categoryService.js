import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllCategories = async () => {
  const res = await axios.get(API_URL + "/categories/getAllCategory");
  return res.data;

};

const categoryService = {
    getAllCategories
};

export default categoryService