import React from "react";
import { useState } from "react";
import axios from "axios";
export const EditTeam = (props) => {
  // console.log(props.show, "hvhj");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  async function updateTeam() {
    const { data } = await axios.put(
      `http://localhost:5000/api/team/${props.name}/edit`,
      { name, goal }
    );
    setIsVisible(false);
    alert(data.message);
    setShowEdit(false);
  }
  async function deleteTeam() {
    const { data } = await axios.delete(
      `http://localhost:5000/api/team/${props.name}/delete`
    );
    setIsVisible(false);
    alert(data.message);
    setShowDelete(false);
  }

  if (!props.show || !isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-darkGrey backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          {!showDelete && (
            <div className="taskBox my-1 px-1">
              <h1 className="text-2xl font-bold ">{props.name}</h1>
              <p className="">{props.goal}</p>
            </div>
          )}

          {showEdit && (
            <>
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
              <button onClick={updateTeam}>Save</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </>
          )}
          {showDelete && (
            <div className="taskBox my-1 px-1">
              <p className="text-2xl font-bold ">
                Do you wish to delete the team ?
              </p>
              <button onClick={deleteTeam}>Yes</button>
              <button onClick={() => setShowDelete(false)}>Cancel</button>
            </div>
          )}
          {!showEdit && !showDelete && (
            <div className="flex w-[500px] mx-auto">
              <button onClick={() => setShowEdit(true)}>Edit</button>
              <button onClick={() => setShowDelete(true)}>Delete</button>
              <button onClick={props.onClose}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
