import React from "react";
import Teams from "./Teams";
import Options from "./Options";
const Workspace = () => {
  return (
    <div className="max-w-screen bg-orange  min-h-screen">
      <Teams />
      <Options />
    </div>
  );
};

export default Workspace;
