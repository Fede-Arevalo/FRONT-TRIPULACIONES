import React, { useEffect, useState } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import Incident from "../Incident/Incident";
import { useDispatch, useSelector } from "react-redux";
import { getAllIncidents, getAllIncidentsPending, getAllIncidentsSent } from "../../features/incidents/incidentsSlice";
import { Select, Spin } from "antd";
import CategoriesNav from "../CategoriesNav/CategoriesNav";

import "./IncidentsAdmin.scss";
import { Option } from "antd/es/mentions";
// import { Option } from "antd/es/mentions";

const IncidentsAdmin = () => {
  const [incidentsState, setIncidentsState] = useState("todos");
  const { isLoading } = useSelector((state) => state.incidents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIncidents());
    setIncidentsState("todos");
    if (isLoading) {
      return (
        <div className="spiner">
          <Spin size="large" />
        </div>
      );
    }
  }, []);

  return (
    <div className="incidents">
      <SelectMenu />

      <div className="add">
        <div className="filter">
          <CategoriesNav className="category-select" />
          <Select
            placeholder="Estado"
            name=""
            id=""
            className="select-state"
            onChange={(value) => {
              if (value === "Enviado") {
                dispatch(getAllIncidentsSent());
              } else if (value === "Pendiente") {
                dispatch(getAllIncidentsPending());
              } else {
                dispatch(getAllIncidents());
              }
            }}
          >
            <Option value="Enviado">Enviado</Option>
            <Option value="Pendiente">Pendiente</Option>
            <Option value="Todos">Todos</Option>
          </Select>
        </div>
      </div>
      <Incident incidentState={incidentsState} />
    </div>
  );
};

export default IncidentsAdmin;
