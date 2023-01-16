import axios from "axios";

const API_URL = "http://localhost:8080";

const createPost = async (postData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + "/posts/createPost/", postData, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const getAllPosts = async () => {
  const res = await axios.get(API_URL + "/posts/getAllPosts");
  return res.data;
};

const getPostById = async (_id) => {
  const res = await axios.get(API_URL + "/posts/getPostById/" + _id);
  return res.data;
};

const getPostByName = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts/getPostByName/" + postTitle);
  return res.data;
};


const updatePostById = async (data) => {
  console.log(data)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/posts/updatePostById/" + data._id, data, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const deletePost = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/posts/deletePostById/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const deletePostAdmin = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/posts/deletePostAdmin/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/posts/like/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const dislike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/posts/dislike/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const postsService = {
  createPost,
  getAllPosts,
  getPostById,
  getPostByName,
  deletePost,
  deletePostAdmin,
  updatePostById,
  like,
  dislike,
};

export default postsService;
