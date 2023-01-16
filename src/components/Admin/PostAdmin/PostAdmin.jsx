import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAdmin } from "../../../features/posts/postsSlice";

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const post = posts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <h2>{post.title}</h2>
        <img
          src={"http://localhost:8080/" + post.image}
          alt={post.title}
          width="90px"
        />
        <br />
        <button onClick={() => dispatch(deletePostAdmin(post._id))}>Delete</button>
      </div>
    );
  });

  return <div>{post}</div>;
};

export default PostAdmin;
