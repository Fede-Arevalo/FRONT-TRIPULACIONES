import axios from "axios";

const API_URL = "https://back-tripulaciones-production-e793.up.railway.app";

const createEvent = async (eventData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(
    API_URL + "/events/createEvent/",
    eventData,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const deleteEventById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(
    API_URL + "/events/deleteEventById/" + _id,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const getAllEvents = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/events/getAllEvents", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const getEventById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/events/getEventById/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const updateEventById = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/events/updateEventById/" + data._id,
    data,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const incidentsService = {
  createEvent,
  deleteEventById,
  getAllEvents,
  updateEventById,
  getEventById,
};

export default incidentsService;
