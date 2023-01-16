import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users/register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      authorization: user?.token,
    },
  });

  if (res.data) {
    localStorage.removeItem("user");
  }
  return res.data;
};

const deleteUserById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/users/deleteUserById/" + _id, {
    headers: {
      authorization: user.token,
    },
  });
  return res.data;
};

const getAllUsers = async () => {
  const res = await axios.get(API_URL + "/users/getAllUsers");
  return res.data;
};

const loggedIn = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/users/loggedIn", {
    headers: {
      authorization: user.token,
    },
  });
  return res.data;
};

const updateUserById = async (myObj) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { editedData, _id } = myObj;

  const res = await axios.put(API_URL + "/users/updateUserById/" + _id, editedData,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  deleteUserById,
  loggedIn,
  updateUserById,
  getAllUsers,
};

export default authService;
