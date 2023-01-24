import React, { useEffect } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import Event from "../Event/Event";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, reset } from "../../features/events/eventsSlice";
import { Button, Spin } from "antd";
import "./Events.scss";

const Events = () => {
  const { isLoading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Función para evitar warning en useEffect
  async function getAllEventsAndReset() {
    dispatch(getAllEvents());
    dispatch(reset());
  }

  useEffect(() => {
    getAllEventsAndReset();
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
    <div className="events">
      <SelectMenu />
      {user.user.role === "admin" ? (
        <div className="add">
          <Button className="add-event" href="/addEvent">
            Publicar evento
          </Button>
        </div>
      ) : (
        ""
      )}

      <Event />
    </div>
  );
};

export default Events;
