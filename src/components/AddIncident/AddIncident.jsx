import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddIncident.scss";
import { createIncident, reset } from "../../features/incidents/incidentsSlice";
import ModalUbication from "./ModalUbication/ModalUbication";
import CategoriesNav from "../CategoriesNav/CategoriesNav";
import Upload from "../../assets/upload-image.png";

const AddIncident = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
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
    formData.set("category", selectedCategory);
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
            <label>Seleccionar categoría </label>
            <CategoriesNav
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className="custom-input-file">
            <input
              className="input-file"
              type="file"
              name="imageIncident"
              placeholder="image"
            />
            Subir imágen
            <img src={Upload} alt="Home" className="upload-image" />
          </div>

          <ModalUbication />

          <input type="text" name="title" placeholder="Título" />

          <textarea
            name="description"
            rows="20"
            cols="26"
            placeholder="Descripción reporte"
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
