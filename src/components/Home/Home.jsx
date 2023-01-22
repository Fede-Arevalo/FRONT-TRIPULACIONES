import React from "react";
import Wellcome from "../Wellcome/Wellcome";
import "./Home.scss";
import Login from "../Login/Login";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Wellcome />
    </>
  );
};

export default Home;
