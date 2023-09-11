import React from "react";
import Logout from "../user/Logout";

const Options = () => {
  const userInfo = () => {
    // const id = req.user._id;
    // console.log(id)
  };
  return (
    <div className="sidediv z-10 relative ">
      <p className="headText text-lg border-white border-b-2 ">Options</p>
      <div className="m-2 p-1">
        <Logout />
      </div>
    </div>
  );
};

export default Options;
