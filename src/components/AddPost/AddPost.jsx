import { Button, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, reset } from "../../features/posts/postsSlice";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./AddPost.scss";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Post added",
        description: "Successfully posted",
      });
      navigate("/");
    }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.imagePost.files[0])
      formData.set("image", e.target.imagePost.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("body", e.target.body.value);

    dispatch(createPost(formData));

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="addPost">
      <div>
        <form className="addPost-form" onSubmit={onSubmit}>
          <div className="custom-input-file">
            <input
              className="input-file"
              type="file"
              name="imagePost"
              placeholder="image"
            />
            <CloudUploadOutlined /> Image Post
          </div>

          <input type="text" name="title" placeholder="Title" />

          <textarea
            name="body"
            rows="20"
            cols="26"
            placeholder="Write something"
          />

          <Button
            type="primary"
            block
            htmlType="submit"
            className="addPost-form-button"
          >
            Add Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
