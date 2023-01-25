import { Avatar, Button, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./IncidentDetail.scss";
import {
  getIncidentById,
  pendingIncidents,
  sentIncidents,
} from "../../features/incidents/incidentsSlice";
import SelectMenu from "../SelectMenu/SelectMenu";
import MapView from "../Maps/MapView/MapView";

const IncidentDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { _id } = useParams();
  const { incident } = useSelector((state) => state.incidents);

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

  const address =
    incident && incident.locationIncident
      ? incident.locationIncident.split(",")
      : ["No hay ubicación"];

  const shortenedAddress =
    address[0] && address[1]
      ? `${address[0]}, ${address[1]}`
      : "No hay ubicación";

  const pending = () => {
    dispatch(pendingIncidents(incident?._id));
    dispatch(getIncidentById(_id));
  };

  const sent = () => {
    dispatch(sentIncidents(incident?._id));
    dispatch(getIncidentById(_id));
  };

  return (
    <>
      <SelectMenu />
      <div className="cardDetail" key={incident?._id}>
        <div className="top-container-detail">
          <div className="usuario-detail">
            <Avatar
              size={54}
              src={"https://back-tripulaciones-production-e793.up.railway.app/" + incident.userId?.imageUser}
              alt={incident.userId?.name}
            />

            <div className="nombre-detail">
              {incident.userId?.name}

              <div className="ubicacion-detail">
                <EnvironmentOutlined />
                <span> {shortenedAddress}</span>
              </div>
            </div>
          </div>

          <div className="estado-container-detail">
            <div className="estado-incidencia-detail">
              Estado:
              <span>
                {" "}
                {incident?.send_incident?.length === 1
                  ? "ENVIADO"
                  : "PENDIENTE"}{" "}
              </span>
            </div>

            <div className="fecha-detail">
              {getDateDetail(incident?.createdAt)}
            </div>
          </div>
        </div>

        <div className="imagen-incidencia-detail">
          <img
            src={"https://back-tripulaciones-production-e793.up.railway.app/" + incident?.imageIncident}
            alt="img"
            width="100%"
          />
        </div>

        <div className="descripcion-incidencia-detail">
          <div className="category">
            <span>{incident?.category}</span>
          </div>
          <h1>Descripción</h1>
          <p>{incident?.description}</p>
        </div>

        <div className="sin-controles">
          <MapView
            className="mapa-incidencias"
            address={incident?.locationIncident}
          />
        </div>
        <div className="space-for-map"></div>

        {user.user.role === "admin" ? (
          // creo que esta invertida la selccion
          <div className="cambiar-estado">
            <p>Estado:</p>

            <Button onClick={() => pending()}>
              <span>
                {incident?.send_incident?.length === 1 ? (
                  <div className="gris" />
                ) : (
                  <div className="naranja" />
                )}
              </span>
              Pendiente
            </Button>

            <Button onClick={() => sent()}>
              <span>
                {incident?.send_incident?.length === 1 ? (
                  <div className="naranja" />
                ) : (
                  <div className="gris" />
                )}
              </span>{" "}
              Enviado
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default IncidentDetail;
