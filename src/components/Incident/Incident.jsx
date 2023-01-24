import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Incident.scss";

const Incident = () => {
  const { incidents } = useSelector((state) => state.incidents);

  const incident = incidents?.map((incident) => {
    const getDateDetail = (date) => {
      const dateDetail = new Date(date);
      const hours =
        dateDetail.getHours() > 10
          ? `${dateDetail.getHours()}`
          : `0${dateDetail.getHours()}`;
      const minutes =
        dateDetail.getMinutes() > 10
          ? `${dateDetail.getMinutes()}`
          : `0${dateDetail.getMinutes()}`;
      return `${dateDetail.getDate()} ${dateDetail
        .toLocaleString("es-ES", { month: "short" })
        .toLowerCase()}. ${dateDetail.getFullYear()} - ${hours}:${minutes}`;
    };

    const address = incident?.locationIncident.split(",");
    const shortenedAddress = `${address[0]}, ${address[1]}`;

    return (
      <div className="card" key={incident?._id}>
        <div className="top-container">
          <div className="usuario">
            <Avatar
              size={54}
              src={"http://localhost:8080/" + incident.userId?.imageUser}
              alt={incident.userId?.name}
            />
            <div className="nombre">
              {incident.userId?.name}
              <div className="ubicacion">
                <EnvironmentOutlined />
                <span> {shortenedAddress}</span>
              </div>
            </div>
          </div>

          <div className="estado-container">
            <div className="estado-incidencia">
              Estado:<span>Enviado</span>
            </div>

            <div className="fecha">{getDateDetail(incident.createdAt)}</div>
          </div>
        </div>

        <Link to={"/incident/" + incident?._id}>
          <div className="bottom-container">
            <div className="imagen-incidencia">
              <div
                className="img-container"
                style={{
                  backgroundImage: `url(${
                    "http://localhost:8080/" + incident?.imageIncident
                  })`,
                }}
              />
            </div>

            <div className="descripcion-incidencia">
              <div className="category">
                <span>{incident?.category}</span>
              </div>
              <h1>Descripción</h1>
              <p>{incident?.description}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="incident">{incident}</div>;
};

export default Incident;
