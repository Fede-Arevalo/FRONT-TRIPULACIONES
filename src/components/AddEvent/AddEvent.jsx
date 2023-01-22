import React, { useEffect } from "react";
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./AddEvent.scss";
import { createEvent, reset } from "../../features/events/eventsSlice";

const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Evento agregado",
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

    if (e.target.imageEvent.files[0])
      formData.set("imageEvent", e.target.imageEvent.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("eventDate", e.target.eventDate.value);
    formData.set("timeEvent", e.target.timeEvent.value);
    formData.set("location", e.target.location.value);
    formData.set("content", e.target.content.value);

    dispatch(createEvent(formData));
    setTimeout(() => {
      navigate("/events");
    }, 2000);
  };

  return (
    <div className="addEvent">
      <div>
        <form className="addEvent-form" onSubmit={onSubmit}>
          <h1>RELLENE LOS DATOS PARA PODER PUBLICAR</h1>

          <div className="custom-input-file">
            <input
              className="input-file"
              type="file"
              name="imageEvent"
              placeholder="image"
            />
            <CloudUploadOutlined /> Subir imágen
          </div>

          <input type="text" name="title" placeholder="Título Evento" />
          <input type="date" name="eventDate" placeholder="Fecha"></input>
          <input type="text" name="timeEvent" placeholder="Horario"></input>
          <input type="text" name="location" placeholder="Ubicación" />

          <textarea
            name="content"
            rows="20"
            cols="26"
            placeholder="Detalles del Evento"
          />

          <Button type="primary" block htmlType="submit">
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
