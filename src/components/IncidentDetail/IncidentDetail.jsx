import { Avatar, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./IncidentDetail.scss";
import { getIncidentById } from "../../features/incidents/incidentsSlice";
import SelectMenu from "../SelectMenu/SelectMenu";
import MapView from "../Maps/MapView/MapView";

const IncidentDetail = () => {
  const { _id } = useParams();
  const { incident } = useSelector((state) => state.incidents);
  // const { user } = useSelector((state) => state.auth);
  console.log(incident);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncidentById(_id));
    // eslint-disable-next-line
  }, []);

  if (!incident) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const date = incident.createdAt?.slice(0, 10);
  const time = incident.createdAt?.slice(11, 16);

  return (
    <>
      <SelectMenu />
      <div className="cardDetail" key={incident?._id}>
        <div className="top-container">
          <div className="usuario">
            <Avatar
              size={50}
              src={"http://localhost:8080/" + incident.userId?.imageUser}
              alt={incident.userId?.name}
            />
            <div className="nombre">{incident.userId?.name}</div>
          </div>

          <div className="estado-container">
            <div className="estado-incidencia">
              Estado:<span>Enviado</span>
            </div>
          </div>
        </div>

        <div className="mid-container">
          <div className="category">
            <span>{incident?.category}</span>
          </div>

          <div className="fecha">
            <span>{date} |</span>
            <span> {time} hs</span>
          </div>
        </div>

        <div className="imagen-incidencia">
          <img
            src={"http://localhost:8080/" + incident?.imageIncident}
            alt="img"
            width="100%"
          />
        </div>

        <div className="descripcion-incidencia">
          <h1>{incident?.title}</h1>
          <p>{incident?.description}</p>
        </div>

        <div className="ubicacion">
          <EnvironmentOutlined />
          <span> {incident?.locationIncident}</span>
        </div>

        <MapView />
      </div>
    </>
  );
};

export default IncidentDetail;
