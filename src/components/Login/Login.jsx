import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { notification, Button, Form, Input } from "antd";
import Logo from "../../assets/isologo-g-free-celeste.png";
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
      notification.success({ message: "Login Success!", description: message });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (isError) {
      notification.error({
        message: "Wrong email or password",
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
      <img src={Logo} alt="Logo-G-free" className="logo" />
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
            placeholder="email"
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
            placeholder="password"
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
            Log in
          </Button>
        </Form.Item>
      </Form>
      <p>You don't have an account?</p>
      <Link to="/register"><span>Sign up!</span></Link>
    </div>
  );
};

export default Login;
