import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllIncidents, reset } from "../../features/incidents/incidentsSlice";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Divider, Spin } from "antd";
import "./Profile.scss";
import UserInfo from "./UserInfo/UserInfo";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { incidents, isLoading } = useSelector((state) => state.incidents);

  async function getAllIncidentsAndReset() {
    await dispatch(getAllIncidents());
    dispatch(reset());
  }

  useEffect(() => {    
    getAllIncidentsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const userIncident = incidents?.map((incident) => {
    if (user?._id === incident?.userId?._id) {
      return (
        <div className="card" key={incident._id}>
          <div className="top-container">
            <div className="estado-container">
              <div className="estado-incidencia">
                Estado:<span>Enviado AYTO</span>
              </div>
            </div>
            <div className="usuario">
              <Avatar
                size={70}
                src={"http://localhost:8080/" + incident.userId?.imageUser}
                alt={incident.userId?.name}
              />
              <div className="nombre">{incident.userId?.name}</div>
            </div>

            <div className="ubicacion-incidencia">
              <EnvironmentOutlined />
              <span> Calle camino nuevo 6</span>
            </div>

            <p>{incident.body}</p>

            <div className="fecha">
              <span>02/03/2023 22:52</span>
            </div>
          </div>

          <div className="imagen-incidencia">
            <Link to={"/post/" + incident._id}>
              <img
                src={"http://localhost:8080/" + incident.image}
                alt={incident.title}
                width="100%"
              />
            </Link>
          </div>
        </div>
      );
    }
    return <div key={incident._id}></div>;
  });

  return (
    <div className="profile">
      <UserInfo />
      <Divider />
      <div className="userPost">
        {userIncident}
        <h1>Mis Incidencias</h1>
      </div>
    </div>
  );
};

export default Profile;
