import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Incident.scss";

const Post = () => {
  const { incidents } = useSelector((state) => state.incidents);

  const incident = incidents?.map((incident) => {
    console.log(incident);
    return (
      <div className="card" key={incident._id}>
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
              <span>02/03/2023 22:52</span>
            </div>
          </div>
        </div>

        <div className="mid-container">
          <div className="category">
            <span>{incident.category}</span>
          </div>
          <div className="ubicacion">
            <EnvironmentOutlined />
            <span> {incident.locationIncident}</span>
          </div>
        </div>

        <div className="bottom-container">

          <div className="imagen-incidencia">
            <Link to={"/post/" + incident._id}>
              <img
                src={"http://localhost:8080/" + incident.imageIncident}
                alt="img"
                width="100%"
              />
            </Link>
          </div>

          <div className="descripcion-incidencia">
            <h1>{incident.title}</h1>
            <p>{incident.description}</p>
          </div>
          
        </div>
      </div>
    );
  });

  return <div className="incident">{incident}</div>;
};

export default Post;
