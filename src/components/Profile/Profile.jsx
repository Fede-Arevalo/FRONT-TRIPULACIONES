import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggedIn } from "../../features/auth/authSlice";
import { getAllPosts, reset } from "../../features/posts/postsSlice";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Divider, Spin } from "antd";
import "./Profile.scss";
import UserInfo from "./UserInfo/UserInfo";

const Profile = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.posts);

  async function getAllPostsAndReset() {
    await dispatch(getAllPosts());
    dispatch(reset());
  }

  useEffect(() => {
    dispatch(loggedIn());
    getAllPostsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const userPost = posts?.map((post) => {
    if (userInfo?._id === post?.userId?._id) {
      return (
        <div className="card" key={post._id}>
          <div className="top-container">
            <div className="estado-container">
              <div className="estado-incidencia">
                Estado:<span>Enviado AYTO</span>
              </div>
            </div>
            <div className="usuario">
              <Avatar
                size={70}
                src={"http://localhost:8080/" + post.userId?.imageUser}
                alt={post.userId?.name}
              />
              <div className="nombre">{post.userId?.name}</div>
            </div>

            <div className="ubicacion-incidencia">
              <EnvironmentOutlined />
              <span> Calle camino nuevo 6</span>
            </div>

            <p>{post.body}</p>

            <div className="fecha">
              <span>02/03/2023 22:52</span>
            </div>
          </div>

          <div className="imagen-incidencia">
            <Link to={"/post/" + post._id}>
              <img
                src={"http://localhost:8080/" + post.image}
                alt={post.title}
                width="100%"
              />
            </Link>
          </div>
        </div>
      );
    }
    return <div key={post._id}></div>;
  });

  return (
    <div className="profile">
      <UserInfo />
      <Divider />
      <div className="userPost">
        {userPost}
        <h1>Mis Incidencias</h1>
      </div>
    </div>
  );
};

export default Profile;
