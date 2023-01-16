import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { like, dislike } from "../../features/posts/postsSlice";
import {
  HeartOutlined,
  HeartTwoTone,
  CommentOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./Post.scss";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { Meta } = Card;  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

    return (
      <div key={post._id}>
        <Card
          hoverable
          style={{ width: 340 }}
          cover={
            <Link to={"/post/" + post._id}>
              <img
                src={"http://localhost:8080/" + post.image}
                alt={post.title}
                width="340"
              />
            </Link>
          }
          actions={[
            <>
              {isAlreadyLiked ? (
                <HeartTwoTone
                  twoToneColor="#eb2f96"
                  onClick={() => dispatch(dislike(post._id))}
                />
              ) : (
                <HeartOutlined onClick={() => dispatch(like(post._id))} />
              )}
            </>,
            <CommentOutlined
              onClick={() => navigate(`/addComment/${post._id}`)}
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                size={40}
                src={"http://localhost:8080/" + post.userId?.imageUser}
                alt={post.userId?.name}
              />
            }
            title={post.title}
            description=<div className="like">
              <strong>{post.likes_post?.length} Grateful people</strong>
              <span> | {post.commentIds?.length} Comments</span>
            </div>
          />
        </Card>
      </div>
    );
  });

  return <div className="post">{post}</div>;
};

export default Post;
