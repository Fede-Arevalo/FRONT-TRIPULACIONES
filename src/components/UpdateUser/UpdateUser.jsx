import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loggedIn, resetPassword, updateUserById } from "../../features/auth/authSlice";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./UpdateUser.scss";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { _id } = useParams();
  
  console.log(user)
  const initialState = {
    name: `${user.user.name}`,
    email: `${user.user.email}`,
    password: "",
    imageUser: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { name, email, password, imageUser } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedData = new FormData();
    if (e.target.imageUser.files[0])
      editedData.set("imageUser", e.target.imageUser.files[0]);
    editedData.set("name", e.target.name.value);
    editedData.set("email", e.target.email.value);
    editedData.set("password", e.target.password.value);
    const myObj = { editedData, _id };
    dispatch(updateUserById(myObj));
    navigate("/profile");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // setFormData(user);
    dispatch(loggedIn());
    dispatch(resetPassword());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="updateUser">
      <form className="updateUser-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
        <div className="custom-input-file">
          <input
            className="input-file"
            type="file"
            name="imageUser"
            value={imageUser}
            onChange={onChange}
          />
          <CloudUploadOutlined /> Image User
        </div>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
          required
        />
        <Button
          type="primary"
          block
          htmlType="submit"
          className="register-form-button"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
