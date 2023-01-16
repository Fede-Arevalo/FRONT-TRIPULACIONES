import axios from "axios";

const API_URL = "http://localhost:8080";

const createComment = async (myObj) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { formData, _id } = myObj;

  const res = await axios.post(
    API_URL + "/comments/createComment/" + _id,
    formData,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const commentsService = {
  createComment,
};

export default commentsService;
