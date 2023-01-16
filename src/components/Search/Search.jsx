import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByName } from "../../features/posts/postsSlice";
import Post from "../Post/Post";
import "./Search.scss"

const Search = () => {
  const { postName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByName(postName));
    // eslint-disable-next-line
  }, [postName]);

  return (
    <div className="search">
      <Post />
    </div>
  );
};

export default Search;
