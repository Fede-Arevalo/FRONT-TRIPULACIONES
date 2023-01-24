import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ShareAltOutlined,
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
          <Link to={"/event/" + event._id}>
            <div className="imagen-event">
              <img
                src={"http://localhost:8080/" + event.imageEvent}
                alt="img"
                width="390"
              />
            </div>
          </Link>
        </div>
      </div>
    );
  });

  return <div className="event">{event}</div>;
};

export default Event;
