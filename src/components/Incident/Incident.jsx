import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Incident.scss";

const Incident = () => {
  const { incidents } = useSelector((state) => state.incidents);

  const incident = incidents?.map((incident) => {
    const date = incident.createdAt?.slice(0, 10);
    const time = incident.createdAt?.slice(11, 16);

    return (
      <div className="card" key={incident?._id}>
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

            <div className="fecha">
              <span>{date} |</span>
              <span> {time} hs</span>
            </div>
          </div>
        </div>

        <div className="mid-container">
          <div className="category">
            <span>{incident?.category}</span>
          </div>
          <div className="ubicacion">
            <EnvironmentOutlined />
            <span> {incident?.locationIncident}</span>
          </div>
        </div>

        <Link to={"/incident/" + incident?._id}>
          <div className="bottom-container">
            <div className="imagen-incidencia">

              <div className="img-container"
                style={{
                  backgroundImage: `url(${"http://localhost:8080/" + incident?.imageIncident})`,
                }}
              >
                Hello World
              </div>

              {/* <img
                src={"http://localhost:8080/" + incident?.imageIncident}
                alt="img"
                width="100%"
              /> */}
            </div>

            <div className="descripcion-incidencia">
              <h1>{incident?.title}</h1>
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
