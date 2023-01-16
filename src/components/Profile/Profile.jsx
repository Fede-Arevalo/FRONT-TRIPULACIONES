import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from "../../features/auth/authSlice";
import {
  dislike,
  getAllPosts,
  like,
  reset,
} from "../../features/posts/postsSlice";
import {
  CommentOutlined,
  HeartTwoTone,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Spin } from "antd";
import "./Profile.scss";
import UserInfo from "./UserInfo/UserInfo";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userInfo } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { Meta } = Card;

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
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

    if (userInfo?._id === post?.userId?._id) {
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
                  src={"http://localhost:8080/" + userInfo?.imageUser}
                  alt={userInfo.name}
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
    }
    return <div key={post._id}></div>;
  });

  return (
    <div className="profile">
      <UserInfo />
      <div className="userPost">{userPost}</div>
    </div>
  );
};

export default Profile;
