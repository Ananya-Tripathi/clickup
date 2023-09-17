import React from "react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
export const EditMember = (props) => {
  const [users, setUsers] = useState([]);
  const [usernames, setusernames] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const handleAddUser = (username) => {
    setusernames([...usernames, username]);
  };
  const getUsers = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:5000/api/user`);

    setUsers(data);

    const usersNotInMembers = data.filter(
      (user) => !props.members.includes(user.id)
    );
    console.log(usersNotInMembers);
    setUsers(usersNotInMembers);
  }, []);

  async function addUser() {
    console.log(usernames);
    const { data } = await axios.post(
      `http://localhost:5000/api/team/${props.teamID}/addMembers`,
      {
        usernames: usernames,
      }
    );
    setIsVisible(false);
    alert(data.message);
  }
  //test branch

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!props.show || !isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-darkGrey backdrop-blur-sm bg-opacity-25 flex justify-center items-center z-20">
        <div className="w-[600px] bg-darkGrey rounded-md flex flex-col p-4 shadow-lightGrey shadow-inner ">
          {/* <button className="rounded-full w-8 h-8 p-2 justify-end items-end" onClick={props.onClose}>x</button> */}
          <div className="my-2 overflow-scroll flex flex-col mx-auto">
            {users &&
              users.map((user, index) => {
                return (
                  <button
                    className="divList"
                    key={index}
                    onClick={() => handleAddUser(user.username)}
                  >
                    {user.username}
                  </button>
                );
              })}
          </div>

          <div className="flex w-[300px] mx-auto">
            <button onClick={addUser}>SUBMIT</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};
