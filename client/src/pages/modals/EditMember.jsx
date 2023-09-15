import React from "react";

export const EditMember = (props) => {
  // console.log(props.show, "hvhj");
  if (!props.show) return null;
  return (
    <>
      <div className="fixed inset-0 bg-darkGrey backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          {/* <button className="rounded-full w-8 h-8 p-2 justify-end items-end" onClick={props.onClose}>x</button> */}
          <input
            type="text"
            placeholder="Enter Team name"
            className="w-[400px] mx-auto my-2 h-10 rounded-sm px-2"
          />
          <input
            type="text"
            placeholder="Enter Team goal"
            className="w-[400px] mx-auto my-2 h-10 rounded-sm px-2"
          />
          <div className="flex w-[300px] mx-auto">
          <button>SUBMIT</button>
          <button onClick={props.onClose}>Cancel</button>
          

          </div>
        </div>
      </div>
    </>
  );
};
