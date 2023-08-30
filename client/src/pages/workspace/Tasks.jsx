import React from "react";
import { PlusCircle } from "lucide-react";
const Tasks = () => {
  return (
    <div className=" bg-lightGrey min-h-screen w-4/6 mx-auto text-center text-white p-2 ">
      <div className="taskBox my-1 px-1">
        <h1 className="text-2xl font-bold">Haikyuuu</h1>
        <p className="">Description</p>
      </div>
      <div className="flex flex-grow-0 space-x-2 px-1">
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">Assigned</p>
        </div>
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">In Progress</p>
        </div>
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">Completed</p>
        </div>
      </div>
      <div className="taskBox m-1 h-16 flex items-center justify-center ">
        <button className="flex items-center justify-center  h-10 w-10 rounded-full mr-2">
          <PlusCircle size={30} className="flex-shrink-0" />
        </button>
        <input
          className="bg-lightGrey rounded-md text-white px-4 h-12 w-full"
          type="text"
          placeholder="Add Comment"
        />
      </div>
    </div>
  );
};

export default Tasks;
