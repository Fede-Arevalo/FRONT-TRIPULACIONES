import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, reset } from "../../features/posts/postsSlice";
import Post from "../Post/Post";
import "./Posts.scss";
import { Spin } from "antd";

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Función para evitar warning en useEffect
  async function getAllPostsAndReset() {
    await dispatch(getAllPosts());

    dispatch(reset());
  }

  useEffect(() => {
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

  return (
    <div className="posts">
      <Post />
    </div>
  );
};

export default Posts;
