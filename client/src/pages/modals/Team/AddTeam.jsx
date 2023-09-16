import React, { useState } from "react";
import axios from "axios";
export const AddTeam = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  async function newTeam() {
    const { data } = await axios.post(`http://localhost:5000/api/team/create`, {
      name,
      goal,
    });
    setIsVisible(false);
    alert(data.message);
  }
  if (!props.show || !isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-darkGrey backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          <input
            type="text"
            placeholder="Enter Team name"
            className="w-[400px] mx-auto my-2 h-10 rounded-sm px-2"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Team goal"
            className="w-[400px] mx-auto my-2 h-10 rounded-sm px-2"
            onChange={(ev) => {
              setGoal(ev.target.value);
            }}
          />
          <div className="flex w-[300px] mx-auto">
            <button onClick={newTeam}>SUBMIT</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};
