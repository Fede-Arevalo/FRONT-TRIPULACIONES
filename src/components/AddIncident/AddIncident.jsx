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
      navigate("/");
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

    if (e.target.imagePost.files[0])
      formData.set("image", e.target.imagePost.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("body", e.target.body.value);

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

          <select name="category">
            <option value="selecciona">Seleccionar Categoría</option>
            <option value="jardineria">Jardineria</option>
            <option value="movilidad-sostenible">Movilidad Sostenible</option>
            <option value="sanidad">Sanidad</option>
            <option value="alumbrado">Alumbrado</option>
            <option value="residuos-limpieza">Residuos Urbanos Y Limpieza</option>
            <option value="otros">Otro tipo de indicencias en via publica</option>
          </select>

          <div className="custom-input-file">
            <input
              className="input-file"
              type="file"
              name="imagePost"
              placeholder="image"
            />
            <CloudUploadOutlined /> Subir imágen
          </div>

          <input type="text" name="location" placeholder="Ubicación" />

          <textarea
            name="body"
            rows="20"
            cols="26"
            placeholder="Descripción del reporte"
          />

          <Button
            type="primary"
            block
            htmlType="submit"
            className="addPost-form-button"
          >
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddIncident;
