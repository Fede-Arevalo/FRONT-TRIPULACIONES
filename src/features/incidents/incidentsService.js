import axios from "axios";

const API_URL = "https://back-tripulaciones-production-e793.up.railway.app/";

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
const getIncidents7Days = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidents7Days", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getIncidents14Days = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidents14Days", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getIncidents24Days = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidents24Days", {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getIncidents60Days = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/incidents/getIncidents60Days", {
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
  getIncidents7Days,
  getIncidents14Days,
  getIncidents24Days,
  getIncidents60Days
};

export default incidentsService;
