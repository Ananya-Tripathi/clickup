import React from "react";
import Logout from "../user/Logout";

const Options = () => {
  return (
    <div className="bg-darkGrey h-[290px] m-1 w-[200px] flex-shrink-0 p-4 text-center z-10 fixed bottom-0 left-0">
      <p className="headText text-lg border-white border-b-2 ">Options</p>
      <div className="m-2 p-1">
        <Logout />
      </div>
    </div>
  );
};

export default Options;
