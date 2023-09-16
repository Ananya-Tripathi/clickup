import axios from "axios";
import { useCallback } from "react";
import React, { useEffect, useState } from "react";
import { EditMember } from "../modals/Member/EditMember";
const Member = (props) => {
  const [member, setMembers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  async function addMember() {
    const { data } = await axios.post(
      `http://localhost:5000/api/team/${props.teamID}/add-members`,
      {
        username: newUsers,
      }
    );
  }

  // async function fetchUsers() {
  //   try {
  //     const { data } = await axios.get(`http://localhost:5000/api/user/`);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // }

  const getMembers = useCallback(async () => {
    console.log(" MTeam Id", props.teamID);
    const { data } = await axios.get(
      `http://localhost:5000/api/team/${props.teamID}/members`
    );
    // console.log(data);
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
        {member && member.map((team, index) => {
          return (
            <button className="divList" key={index}>
              {team}
            </button>
          );
        })}
      </div>
      <button
        className="divButton"
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        Add Member
      </button>
      {/* {console.log(showModal)} */}
      <EditMember
        onClose={() => setShowModal(false)}
        show={showModal}
        teamID={props.teamID}
      />
    </div>
  );
};

export default Member;
