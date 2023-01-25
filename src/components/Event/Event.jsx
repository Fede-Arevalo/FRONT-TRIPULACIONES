import React from "react";
import { useSelector } from "react-redux";
import {
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./Event.scss";

const Event = () => {
  const { events } = useSelector((state) => state.events);

  const event = events?.map((event) => {
    const date = event.eventDate?.slice(0, 10);
    const time = event.timeEvent;

    return (
      <div className="card-event" key={event._id}>
        <div className="top-container-event">
          <h1>{event.title}</h1>
        </div>

        <div className="mid-container-event">
          <div className="ubicacion">
            <EnvironmentOutlined />
            <span> {event.location}</span>
          </div>

          <div className="fecha">
            <CalendarOutlined />
            <span> {date} |</span>
            <span> {time} hs</span>
          </div>
        </div>
        <div className="imagen-event-container">
          <div className="imagen-event">
            <img
              src={"https://back-tripulaciones-production-e793.up.railway.app/" + event.imageEvent}
              alt="img"
              width="390"
            />
          </div>
        </div>
      </div>
    );
  });

  return <div className="event">{event}</div>;
};

export default Event;
