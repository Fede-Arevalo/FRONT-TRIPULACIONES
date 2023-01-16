import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../features/comments/commentsSlice";
import "./AddComment.scss";

const AddComment = () => {
  const { _id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // if (e.target.imageComment.files[0])
    //   formData.set("image", e.target.imageComment.files[0]);
    formData.set("comment", e.target.comment.value);
    formData.set("userId", user.user._id);

    const myObj = { formData, _id };

    dispatch(createComment(myObj));

    setTimeout(() => {
      navigate("/post/" + _id);
    }, 500);

    // console.log(myObj)
    // console.log(Object.fromEntries(formData))
  };

  return (
    <div className="addComment">
      <form className="addComment-form" onSubmit={onSubmit}>
        {/* <input type="file" name="imageComment" placeholder="image" /> */}

        <input type="text" name="comment" placeholder="Comment" />

        <Button block type="primary" htmlType="submit">
          Add comment
        </Button>
      </form>
    </div>
  );
};

export default AddComment;
