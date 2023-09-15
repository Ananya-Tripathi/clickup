import React from "react";
import { useState } from "react";
import { AddComment } from "../modals/AddComment";

const Comments = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="sidediv relative">
      <p className="headText text-lg border-b-2 border-white ">Comments</p>
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
