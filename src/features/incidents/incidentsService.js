import axios from "axios";

const API_URL = "http://localhost:8080";

const createIncident = async (incidentData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(
    API_URL + "/incidents/createIncident",
    incidentData,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const deleteIncidentById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(
    API_URL + "/incidents/deleteIncidentById/" + _id,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const getAllIncidents = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getAllIncidents", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getIncidentsXCategory = async (category ) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidentsXCategory/" + category, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getAllIncidentsSent = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getAllIncidentsSent", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getAllIncidentsPending = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getAllIncidentsPending", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const getIncidentById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidentById/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const updateIncidentById = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/incidents/updateIncidentById/" + data._id,
    data,
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};
const sentIncidents = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/incidents/sendIncidents/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};
const pendingIncidents = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/incidents/pendingIncidents/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const incidentsService = {
  createIncident,
  deleteIncidentById,
  getAllIncidents,
  updateIncidentById,
  getIncidentById,
  sentIncidents,
  pendingIncidents,
  getAllIncidentsPending,
  getAllIncidentsSent,
  getIncidentsXCategory,
};

export default incidentsService;
