import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import Logo from "../../assets/Logo.png";
import { Button, notification } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./Register.scss";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
    imageUser: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2, imageUser } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: `Welcome! ${name}`,
        description: "Successfully registered",
      });
      navigate("/login");
    }
    if (isError) {
      notification.error({ message: "Error register", description: message });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      const formData = new FormData();
      if (e.target.imageUser.files[0])
        formData.set("imageUser", e.target.imageUser.files[0]);
      formData.set("name", e.target.name.value);
      formData.set("email", e.target.email.value);
      formData.set("password", e.target.password.value);
      dispatch(register(formData));
      setFormData(initialState);
    }
  };

  return (
    <div className="register">
      <img src={Logo} alt="Logo-G-free" className="logo" />
      <form className="register-form" onSubmit={onSubmit}>
        <div className="custom-input-file">
          <input
            className="input-file"
            type="file"
            name="imageUser"
            value={imageUser}
            onChange={onChange}
          />
          <CloudUploadOutlined /> FOTO DE PERFIL
        </div>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="NOMBRE"
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-MAIL"
          onChange={onChange}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="CONSTRASEÑA"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="CONFIRMAR CONTRASEÑA"
          onChange={onChange}
          required
        />

        <Button
          type="primary"
          block
          htmlType="submit"
          className="register-form-button"
        >
          Registrarse
        </Button>
      </form>

      <p>¿Ya tienes una cuenta?</p>
      <Link to="/login">
        <span>Ingresa!</span>
      </Link>
    </div>
  );
};

export default Register;
