import React, { useEffect } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import Incident from "../Incident/Incident";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIncidents,
  reset,
} from "../../features/incidents/incidentsSlice";
import { Spin } from "antd";
import "./Events.scss";

const Events = () => {
  const { isLoading } = useSelector((state) => state.incidents);
  const dispatch = useDispatch();

  // Función para evitar warning en useEffect
  async function getAllIncidentsAndReset() {
    dispatch(getAllIncidents());
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

  return (
    <div className="incidents">
      <SelectMenu />
      <Incident />
    </div>
  );
};

export default Events;
