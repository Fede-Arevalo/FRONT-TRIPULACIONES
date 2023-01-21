import React from "react";
import { Button } from "antd";
import "./SelectMenu.scss";

const SelectMenu = () => {
  return (
    <div className="select-menu">
      <div className="buttons">
        <Button className="select">Incidencias</Button>
        <Button className="select">Eventos</Button>
      </div>
      <div className="add">
        <Button className="add-incident" href="/addIncident">
          Publicar Incidencia
        </Button>
      </div>
    </div>
  );
};

export default SelectMenu;
