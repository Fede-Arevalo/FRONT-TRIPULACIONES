import React from "react";
import incidencias from "../../assets/Incidencias.png";
import eventos from "../../assets/Eventos.png";
import "./Wellcome.scss";

const Wellcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="wellcome">
      <div className="saludo">
        <span className="nombre">Hola {user.user.name} !</span>
        <p>¿QUÉ QUIERES HACER AHORA?</p>
      </div>

      <div className="botones">
        <a href="/incidents/">
          <div className="btn-incidencias">
            <p>Ver Incidencias</p>
            <img src={incidencias} alt="Incidencias" />
          </div>
        </a>

        <a href="/events/">
          <div className="btn-eventos">
            <p>Ver Eventos</p>
            <img src={eventos} alt="Incidencias" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Wellcome;
