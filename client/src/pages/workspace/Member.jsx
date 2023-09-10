import axios from "axios";
import { useCallback } from "react";
import React, { useEffect, useState } from "react";

const Member = (props) => {
  const [member, setMembers] = useState([]);
  const getMembers = useCallback(async () => {
    // console.log("Team Id", props.teamID);
    const { data } = await axios.get(
      `http://localhost:5000/api/team/${props.teamID}/members`
    );
    setMembers(data);
  }, [props.teamID]);
  useEffect(() => {
    if (props.teamID) {
      getMembers();
    }
  }, [props.teamID, getMembers]);
  return (
    <div className="sidediv relative">
      <p className="headText text-lg border-white border-b-2 ">Members</p>
      <div className="my-2 overflow-scroll flex flex-col">
        {member.map((team, index) => {
          return (
            <button
              className="divList"
              key={index}
            >
              {team}
              {/* {team.name}
              {console.log(team.name)} */}
            </button>
          );
        })}
      </div>
      <button className="divButton">Add Member</button>
    </div>
  );
};

export default Member;
