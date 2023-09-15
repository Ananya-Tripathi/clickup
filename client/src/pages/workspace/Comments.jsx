import React from "react";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { AddComment } from "../modals/AddComment";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const getComments = useCallback(async () => {
    console.log(" CTeam Id", props.teamID);
    const { data } = await axios.get(
      `http://localhost:5000/api/team/${props.teamID}/getcomments`
    );
    console.log(data);
    setComments(data);
  }, [props.teamID]);

  useEffect(() => {
    if (props.teamID) {
      getComments();
    }
  }, [props.teamID, getComments]);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="sidediv relative">
      <p className="headText text-lg border-b-2 border-white ">Comments</p>
      <div className="my-2 overflow-scroll flex flex-col h-[70%]">
        {comments &&
          comments.map((team, index) => {
            return (
              <div className="divList" key={index}>
                <p className="truncate">{team.text}</p>
              </div>
            );
          })}
      </div>
      <button className="divButton" onClick={() => setShowModal(true)}>
        Add Comment
      </button>
      <AddComment
        onClose={() => setShowModal(false)}
        show={showModal}
        teamId={props.teamID}
      />
    </div>
  );
};

export default Comments;
