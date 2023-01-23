import React, { useEffect } from "react";
import { Button, notification, Form, Input, Select } from "antd";
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

    if (e.target.imagePost.files[0])
      formData.set("imageIncident", e.target.imagePost.files[0]);
    formData.set("incidentDate", e.target.incidentDate.value);
    formData.set("timeIncident", e.target.timeIncident.value);
    formData.set("category", e.target.category.value);
    formData.set("title", e.target.title.value);
    formData.set("description", e.target.description.value);
    formData.set("locationIncident", e.target.locationIncident.value);

    dispatch(createIncident(formData));
  };

  return (
    <div className="addIncident">
      <div>
        <form className="addIncident-form" onSubmit={onSubmit}>
          <h1>Rellene los datos para poder publicar</h1>

          <Form.Item label="Fecha del incidente">
            <Input type="date" name="incidentDate" placeholder="Fecha del incidente" required />
          </Form.Item>

          <Form.Item label="Hora del incidente">
            <Input type="time" name="timeIncident" placeholder="Hora del incidente" required />
          </Form.Item>

          <Form.Item label="Categoría">
            <Select name="category" placeholder="Seleccionar categoría" required>
              <Select.Option value="jardineria">Jardinería</Select.Option>
              <Select.Option value="movilidad-sostenible">Movilidad Sostible</Select.Option>
<Select.Option value="sanidad">Sanidad</Select.Option>
<Select.Option value="seguridad">Seguridad</Select.Option>
<Select.Option value="otro">Otro</Select.Option>
</Select>
</Form.Item>
<Form.Item label="Título">
        <Input type="text" name="title" placeholder="Título del incidente" required />
      </Form.Item>

      <Form.Item label="Descripción">
        <Input.TextArea name="description" placeholder="Detalles del incidente" required />
      </Form.Item>

      <Form.Item label="Imagen del incidente">
        <Input type="file" name="imagePost" placeholder="Imagen del incidente" accept="image/*" required />
        <CloudUploadOutlined className="upload-icon" />
      </Form.Item>

      <Form.Item label="Ubicación del incidente">
        <Input type="text" name="locationIncident" placeholder="Ubicación del incidente" required />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Enviar
      </Button>
    </form>
  </div>
</div>
);
};

export default AddIncident;