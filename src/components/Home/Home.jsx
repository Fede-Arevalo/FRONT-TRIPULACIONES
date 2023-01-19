import React, { useEffect } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../features/auth/authSlice";
import incidencias from "../../assets/Incidencias.png";
import eventos from "../../assets/Eventos.png";
import Logo from "../../assets/Logo.png";

const Home = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loggedIn());
    // eslint-disable-next-line
  }, []);

  if (!userInfo) {
    return (
      <div className="no-user">        
        <img src={Logo} alt="Logo" className="logo" />
        
      </div>
    );
  }

  return (
    <div className="home">
      <div className="saludo">
        <span className="nombre">Hola {userInfo.name} !</span>
        <p>¿QUÉ QUIERES HACER AHORA?</p>
      </div>

      <div className="botones">
        <a href="/incidents/">
          <div className="btn-incidencias">
            <p>Ver Incidencias</p>
            <img src={incidencias} alt="Incidencias" />
          </div>
        </a>

        <div className="btn-eventos">
          <p>Ver Eventos</p>
          <img src={eventos} alt="Incidencias" />
        </div>
      </div>
    </div>
  );
};

export default Home;
