import React from "react";
export const ViewComments = (props) => {

  return (
    <>
      <div className="fixed inset-0 bg-darkGrey backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          <div className="taskBox my-1 px-1">
            <h1 className="text-2xl font-bold text-white">Comments</h1>
          </div>
          <div className="my-2 overflow-scroll flex flex-col h-[70%] text-white">
            {props.comment &&
              props.comment.map((value, index) => {
                return (
                  <div className="w-[28rem] mx-auto mb-1 overflow-scroll bg-lightGrey rounded-md p-2">
                    <p className="w-[20rem] mx-auto px-4 text-left font-semibold">
                      {value.text}
                    </p>
                    <p className="w-[20rem] mx-auto px-10 text-right">
                      -{value.postedBy}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="flex w-[300px]  mx-auto my-4">
            <button onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};
