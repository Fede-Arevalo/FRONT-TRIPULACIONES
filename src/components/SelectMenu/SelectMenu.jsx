import React from "react";
import { Button } from "antd";
import "./SelectMenu.scss";

const SelectMenu = () => {
  return (
    <div className="select-menu">
      <div className="buttons">
        <Button className="select" href="/incidents">
          Incidencias
        </Button>
        <Button className="select" href="/events">Eventos</Button>
      </div>

      
    </div>
  );
};

export default SelectMenu;
