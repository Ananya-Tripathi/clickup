import React from "react";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { AddComment } from "../modals/Comments/AddComment";
import { ViewComments } from "../modals/Comments/ViewComments";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
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

  return (
    <div className="sidediv relative">
      <p
        className="headText text-lg border-b-2 border-white hover:cursor-pointer"
        onClick={() => setShowComments(true)}
      >
        Comments
      </p>
      {showComments && (
        <ViewComments
          comment={comments}
          show={showComments}
          onClose={() => {
            setShowComments(false);
          }}
        />
      )}

      {/* preview comment */}
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

      {/* Add new Comment*/}
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
