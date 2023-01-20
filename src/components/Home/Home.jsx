import React, { useEffect } from "react";
import Wellcome from "../Wellcome/Wellcome";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../features/auth/authSlice";
import "./Home.scss";
import Login from "../Login/Login";

const Home = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loggedIn());
    // eslint-disable-next-line
  }, []);

  if (!userInfo) {
    return (      
        <Login />      
    );
  }

  return (
    <>
      <Wellcome />
    </>
  );
};

export default Home;
