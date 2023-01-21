import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Post.scss";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  const post = posts?.map((post) => {
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
  });

  return <div className="post">{post}</div>;
};

export default Post;
