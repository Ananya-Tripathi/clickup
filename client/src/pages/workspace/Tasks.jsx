import React, { useState } from "react";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { PlusCircle } from "lucide-react";
const Tasks = (props) => {
  const [teamData, setTeamData] = useState("");
  const getData = useCallback(async () => {
    console.log("Team Id", props.teamID);
    const { data } = await axios.get(
      `http://localhost:5000/api/team/${props.teamID}/getTeamData`
    );
    setTeamData(data);
  }, [props.teamID]);
  useEffect(() => {
    if (props.teamID) {
      getData();
    }
  }, [props.teamID, getData]);
  async function addComment() {
    console.log("good");
  }
  return (
    <div className=" bg-lightGrey min-h-screen w-[67%] mx-auto text-center text-white p-2 rounded-md">
      <div className="taskBox my-1 px-1">
        <h1 className="text-2xl font-bold">{teamData.name}</h1>
        <p className="">{teamData.description}</p>
      </div>
      <div className="flex flex-grow-0 space-x-2 px-1">
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">Assigned</p>
          <div className="my-2 overflow-scroll flex flex-col">
            {teamData.assignedTasks &&
              teamData.assignedTasks.map((team, index) => {
                return (
                  <button
                    className="headText text-md rounded-sm bg-lightGrey my-1 hover:cursor-pointer px-2 py-1 w-[10rem]"
                    key={index}
                  >
                    {team}
                    {/* {team.name}
              {console.log(team.name)} */}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">In Progress</p>
          <div className="my-2 overflow-scroll flex flex-col">
            {teamData.ongoingTasks &&
              teamData.ongoingTasks.map((team, index) => {
                return (
                  <button
                    className="headText text-md rounded-sm bg-lightGrey my-1 hover:cursor-pointer px-2 py-1 w-[10rem]"
                    key={index}
                  >
                    {team}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="taskBox w-[290px]   ">
          <p className="font-semibold">Completed</p>
          <div className="my-2 overflow-scroll flex flex-col">
            {teamData.completedTasks &&
              teamData.completedTasks.map((team, index) => {
                return (
                  <button
                    className="headText text-md rounded-sm bg-lightGrey my-1 hover:cursor-pointer px-2 py-1 w-[10rem]"
                    key={index}
                  >
                    {team}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <form
        className="taskBox mx-1 h-16 flex items-center justify-center bottom-1 w-[65%] absolute "
        onSubmit={addComment}
      >
        <button className="flex items-center justify-center  h-10 w-10 rounded-full mr-2">
          <PlusCircle size={30} className="flex-shrink-0" />
        </button>
        <input
          className="bg-lightGrey rounded-md text-white px-4 h-12 w-full"
          type="text"
          placeholder="Add Comment"
        />
      </form>
    </div>
  );
};

export default Tasks;
