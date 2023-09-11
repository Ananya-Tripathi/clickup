import React, { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import Comments from "./Comments";
import Member from "./Member";
import Options from "./Options";
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
    <div className="max-w-screen bg-grey  min-h-screen flex flex-col">
      <div className="flex gap-x-0">
        <div className="flex flex-col my-auto">
          <div className="sidediv relative  ">
            <h1 className="headText text-lg border-b-2 border-white ">
              Teamssss
            </h1>

            <div className="my-2 overflow-scroll flex flex-col">
              {teams.map((team) => {
                return (
                  <button
                    className="divList"
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
            <button className="divButton">Add Team</button>
          </div>
          <Options />
        </div>      
        {teamID ? (
          <>
            <Tasks teamID={teamID} />
            <div className="my-auto">
              <Comments />
              <Member teamID={teamID} />
            </div>
          </>
        ) : (
          <>
            <div className="text-white max-h-xl min-w-2xl max-w-3xl mt-44 ml-10">
              <p className="font-bold text-7xl ">Get Started</p>
              <p className="font-bold text-2xl px-2 text-pink">
                Let's get work done . . .
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Teams;
