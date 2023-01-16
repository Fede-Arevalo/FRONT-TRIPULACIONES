import { Avatar, Divider, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dislike, getPostById, like } from "../../features/posts/postsSlice";
import {
  EditOutlined,
  MessageTwoTone,
  HeartTwoTone,
  HeartOutlined,
} from "@ant-design/icons";
import "./PostDetail.scss";

const PostDetail = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(_id));
    // eslint-disable-next-line
  }, []);

  if (!post.commentIds) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const comments = post.commentIds.map((comment) => {
    return (
      <div classkey={comment._id}>
        <Avatar
          size={20}
          src={"http://localhost:8080/" + comment.userId?.imageUser}
          alt={comment.userId?.name}
        />{" "}
        <span>{comment.userId?.name}</span>
        <p>{comment.comment}</p>
      </div>
    );
  });

  const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

  async function likePost() {
    await dispatch(like(post._id));
    dispatch(getPostById(_id));
  }

  async function dislikePost() {
    await dispatch(dislike(post._id));
    dispatch(getPostById(_id));
  }

  return (
    <div className="postDetail">
      <div className="container-image">
        <div className="user">
          <Avatar
            size={40}
            src={"http://localhost:8080/" + post.userId?.imageUser}
            alt={post.userId?.name}
          />
          <p>{post.userId?.name}</p>
        </div>

        <div className="imagePost">
          <img
            src={"http://localhost:8080/" + post.image}
            alt={post.title}
            width="100%"
            style={{
              borderRadius: "10px",
            }}
          />

          <div className="edit">
            <Link to={"/UpdatePost/" + _id}>
              <EditOutlined />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-body">
        <div className="icons">
          <div className="icon-1">
            {isAlreadyLiked ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                onClick={() => dislikePost()}
              />
            ) : (
              <HeartOutlined onClick={() => likePost()} />
            )}
          </div>
          <div className="icon-2">
            <Link to={"/addComment/" + _id}>
              <MessageTwoTone />
            </Link>
          </div>
        </div>

        <div className="body">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <Divider />
        <div className="comments">
          <h2>Comments</h2>
          {comments}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
