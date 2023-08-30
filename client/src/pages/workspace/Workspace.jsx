import React from "react";
import Tasks from "./Tasks";
import Comments from "./Comments";
import Member from "./Member";
import Teams from "./Teams";
import Options from "./Options";
const Workspace = () => {
  return (
    <div className="flex max-w-screen bg-orange ">
      <div className=" bg-orange ">
        <Teams />
        <Options />
      </div>
      <Tasks />
      <div className=" bg-orange ">
        <Comments />
        <Member />
      </div>
    </div>
  );
};

export default Workspace;
