import Team from "../models/Team.js";

export const addComment = async (req, res) => {
  const teamId = req.params.teamId;
  const { text, postedBy } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const newComment = {
      text,
      postedBy,
    };

    team.comments.push(newComment);
    await team.save();

    return res.status(200).json({ message: "Comment added to the team" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteComment = async (req, res) => {
  const teamId = req.params.teamId;
  const commentId = req.params.commentId;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const comment = team.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.remove();
    await team.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
