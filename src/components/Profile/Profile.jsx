import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIncidents,
  reset,
} from "../../features/incidents/incidentsSlice";
import { RightOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import "./Profile.scss";
import UserInfo from "./UserInfo/UserInfo";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.incidents);

  async function getAllIncidentsAndReset() {
    await dispatch(getAllIncidents());
    dispatch(reset());
  }

  useEffect(() => {
    getAllIncidentsAndReset();
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
    <div className="profile">
      <UserInfo />

      <div className="container-principal">
        <div className="container-left">
          <span className="label">NOMBRE</span>
          <span className="dato">{user.user.name}</span>
        </div>
        <div className="container-right">
          <Link to={"/UpdateUser/" + user._id}>
            <RightOutlined />
          </Link>
        </div>
      </div>
      <div className="container-principal">
        <div className="container-left">
          <span className="label">E-MAIL</span>
          <span className="dato">{user.user.email}</span>
        </div>
        <div className="container-right">
          <Link to={"/UpdateUser/" + user._id}>
            <RightOutlined />
          </Link>
        </div>
      </div>
      <div className="container-principal">
        <div className="container-left">
          <span className="label">CONTRASEÑA</span>
          <span className="dato">**********</span>
        </div>
        <div className="container-right">
          <Link to={"/UpdateUser/" + user._id}>
            <RightOutlined />
          </Link>
        </div>
      </div>
      <Button className="btn-edit-user" href={"/UpdateUser/" + user._id}>
        Editar
      </Button>
    </div>
  );
};

export default Profile;
