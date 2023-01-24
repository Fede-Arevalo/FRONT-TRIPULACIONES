import React, { useEffect } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import Incident from "../Incident/Incident";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIncidents,
  getAllIncidentsPending,
  getAllIncidentsSent,
  getIncidentsXCategory,
  reset,
} from "../../features/incidents/incidentsSlice";
import { Button, Select, Spin } from "antd";
import "./Incidents.scss";
import { Option } from "antd/es/mentions";
import { getAllCategories } from "../../features/categories/categorySlice";

const Incidents = () => {
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.incidents);
  const dispatch = useDispatch();

  async function getAllIncidentsAndReset() {
    dispatch(getAllCategories());
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

  const selectOption = categories?.map((category) => {
    return (
      <Option key={category?._id} value={category?.name}>
        {category?.name}
      </Option>
    );
  });

  return (
    <div className="incidents">
      <SelectMenu />
      <div className="add">
        <Button className="add-incident" href="/addIncident">
          Publicar incidencia
        </Button>
        {user.user.role === "admin" ? (
          <div className="filter">
            <Select
              placeholder="por favor selecione una categoria"
              className="input-category"
              onChange={(value) => {
                dispatch(getIncidentsXCategory(value));
              }}
            >
              {selectOption}
            </Select>
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
        ) : (
          ""
        )}
      </div>
      <Incident />
    </div>
  );
};

export default Incidents;
