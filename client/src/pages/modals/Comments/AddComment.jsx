import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const AddComment = (props) => {
  const [comment, setComment] = useState("");
  const [exit, setExit] = useState(true);
  const { id } = useParams();
  async function newComment() {
    // console.log(id, props.teamId);
    const { data } = await axios.post(
      `http://localhost:5000/api/team/${props.teamId}/addComment`,
      {
        text: comment,
        postedBy: id,
      }
    );
    setExit(false);
    console.log(exit, "vghgv");
    alert(data.message);
  }

  if (!props.show && exit) return null;
  return (
    <>
      <div className="fixed inset-0 bg-darkGrey  backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          {/* <button className="rounded-full w-8 h-8 p-2 justify-end items-end" onClick={props.onClose}>x</button> */}
          <input
            type="text"
            placeholder="Enter Comment"
            className="w-[400px] mx-auto my-2 h-10 rounded-sm px-2"
            onChange={(ev) => setComment(ev.target.value)}
          />

          <div className="flex w-[300px] mx-auto my-4">
            <button onClick={newComment}>SUBMIT</button>
            <button onClick={props.onClose}>CANCEL</button>
          </div>
        </div>
      </div>
    </>
  );
};
