import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, reset } from "../../features/posts/postsSlice";
import PostAdmin from "./PostAdmin/PostAdmin";

const Admin = () => {
  const { isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getAllPosts());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
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
    <div>
      <h1>Admin</h1>
      <PostAdmin />
    </div>
  );
};

export default Admin;
