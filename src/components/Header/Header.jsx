import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="header">
      <nav>
        {location.pathname !== "/" ? (
          <LeftOutlined className="back" onClick={() => navigate(-1)} />
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Header;
