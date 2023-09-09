import React, { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import Comments from "./Comments";
import Member from "./Member";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [teamID, setTeamID] = useState("");
  const selectTeam = (id) => {
    setTeamID(id);
    console.log("teamss", teamID);
  };
  async function getTeams() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/team");
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="flex gap-x-0">
      <div className="bg-darkGrey h-[300px] m-1 w-[200px] flex-shrink-0 p-4 text-center">
        <h1 className="headText text-lg border-b-2 border-white ">Teamssss</h1>

        <div className="my-2 overflow-scroll flex flex-col">
          {teams.map((team) => {
            return (
              <button
                className="headText text-md rounded-sm bg-lightGrey my-1 hover:cursor-pointer px-2 py-1 w-[10rem]"
                key={team._id}
                onClick={() => {
                  selectTeam(team._id);
                }}
              >
                {team.name}
              </button>
            );
          })}
        </div>
      </div>
      {teamID ? (
        <>
          <Tasks teamID={teamID}/>
          <div>
            <Comments />
            <Member teamID={teamID} />
          </div>
        </>
      ) : (
        <>
        <div className="text-white max-h-xl min-w-2xl max-w-3xl mt-44 ml-10">
          <p className="font-bold text-7xl ">Get Started</p>
          <p className="font-bold text-2xl px-2">Let's get work done</p>
        </div>
        </>
      )}
    </div>
  );
};

export default Teams;
