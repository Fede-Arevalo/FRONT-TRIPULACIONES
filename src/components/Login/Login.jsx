import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout, reset } from "../../features/auth/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { notification, Button, Form, Input } from "antd";
import Logo from "../../assets/Logotipo.png";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Hola Vecino!", description: message });
      setTimeout(() => {
        navigate("/wellcome");
        setTimeout(() => {
          dispatch(logout());
          localStorage.removeItem("user");
          navigate("/login");
        }, 86400000); //10,000 = 10s   600,000 = 10min   24h = 86400000  48h= 172800000 3días = 259200000  7 días = 604800000
      }, 2000);
    }

    if (isError) {
      notification.error({
        message: "Tu email o password es incorrecto",
        description: message,
      });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFinish = () => {
    dispatch(login(formData));
  };

  return (
    <div className="login">
      <img src={Logo} alt="Logo" className="logo" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            name="email"
            value={email}
            placeholder="E-MAIL"
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="password"
            value={password}
            placeholder="CONTRASEÑA"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
      <p>¿No tienes una cuenta?</p>
      <Link to="/register">
        <span>Regístrate!</span>
      </Link>
    </div>
  );
};

export default Login;
