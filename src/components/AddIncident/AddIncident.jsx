import React, { useEffect } from "react";
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./AddIncident.scss";
import { createIncident, reset } from "../../features/incidents/incidentsSlice";

const AddIncident = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Incidencia agregada",
        description: "Successfully posted",
      });
    }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());

    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.imageIncident.files[0])
      formData.set("imageIncident", e.target.imageIncident.files[0]);
    formData.set("category", e.target.category.value);
    formData.set("locationIncident", e.target.locationIncident.value);
    formData.set("title", e.target.title.value);
    formData.set("description", e.target.description.value);

    dispatch(createIncident(formData));
    setTimeout(() => {
      navigate("/incidents");
    }, 2000);
  };

  return (
    <div className="addIncident">
      <div>
        <form className="addIncident-form" onSubmit={onSubmit}>
          <h1>RELLENE LOS DATOS PARA PODER PUBLICAR</h1>

          <div className="category">
            <label>Categoría: </label>
            <select name="category">
              <option value="jardineria">Jardinería</option>
              <option value="movilidad-sostenible">Movilidad Sostenible</option>
              <option value="sanidad">Sanidad</option>
              <option value="alumbrado">Alumbrado</option>
              <option value="residuos-limpieza">
                Residuos Urbanos y Limpieza
              </option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="custom-input-file">
            <input
              className="input-file"
              type="file"
              name="imageIncident"
              placeholder="image"
            />
            <CloudUploadOutlined /> Subir imágen
          </div>

          <input type="text" name="locationIncident" placeholder="Ubicación" />

          <input type="text" name="title" placeholder="Título" />

          <textarea
            name="description"
            rows="20"
            cols="26"
            placeholder="Descripción del reporte"
          />

          <Button
            type="primary"
            block
            htmlType="submit"
            className="addincident-form-button"
          >
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddIncident;
