import React from "react";
import Posts from "../Posts/Posts";
import SelectMenu from "../SelectMenu/SelectMenu";
import "./Incidents.scss";

const Incidents = () => {
  return (
    <div className="incidents">
      <SelectMenu/>
      <Posts />
    </div>
  );
};

export default Incidents;
