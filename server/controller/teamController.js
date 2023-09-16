import Team from "../models/Team.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Task from "../models/Task.js";
// import Comment from "../models/Comment.js";
export const getAllTeam = async (req, res, next) => {
  let teams;
  try {
    teams = await Team.find();

    if (!teams) {
      return res.status(400).json({ message: "No Team Found" });
    } else {
      return res.status(200).json(teams);
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTeam = async (req, res, next) => {
  const { name, goal } = req.body;

  try {
    const team = new Team({
      name,
      goal,
    });

    await team.save();
    return res.status(200).json({ message: "Team added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to create team" });
  }
};

export const deleteTeam = async (req, res, next) => {
  const teamName = req.params.teamName;
  console.log(teamName);

  try {
    const team = await Team.findOneAndRemove({ name: teamName });
    if (team) {
      return res.status(200).json({ message: "Team deleted successfully" });
    } else {
      return res.status(400).json({ message: "Team not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMembers = async (req, res) => {
  const teamId = req.params.teamId;

  try {
    const team = await Team.findById(teamId).populate("members", "name");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const members = team.members.map((member) => member.name);
    return res.status(200).json(members);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const addMembersToTeam = async (req, res) => {
  const teamId = req.params.teamId;
  const { usernames } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const users = await User.find({ username: { $in: usernames } });

    const userIds = users.map((user) => user._id);

    team.members.push(...userIds);
    await team.save();

    for (const user of users) {
      user.teams.push(teamId);
      await user.save();
    }

    return res.status(200).json({ message: "Members added to the team" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteMemberFromTeam = async (req, res) => {
  const teamId = req.params.teamId;
  const memberId = req.params.memberId;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await User.findById(memberId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the member's ID from the team's 'members' array
    team.members = team.members.filter(
      (member) => member.toString() !== memberId
    );
    await team.save();

    // Remove the team's ID from the user's 'teams' array
    user.teams = user.teams.filter((team) => team.toString() !== teamId);
    await user.save();

    return res.status(200).json({ message: "Member removed from the team" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getTeamData = async (req, res) => {
  const { teamId } = req.params;

  try {
    // Find the team
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find tasks related to the team
    const assignedTasks = await Task.find({ team: teamId, status: "Assigned" });
    const ongoingTasks = await Task.find({ team: teamId, status: "Ongoing" });
    const completedTasks = await Task.find({
      team: teamId,
      status: "Completed",
    });

    // Prepare the response
    const teamData = {
      name: team.name,
      description: team.goal,
      assignedTasks,
      ongoingTasks,
      completedTasks,
    };

    return res.status(200).json(teamData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateTeamDetails = async (req, res) => {
  const { teamName } = req.params;
  const { name, goal } = req.body;

  try {
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (name) {
      team.name = name;
    }

    if (goal) {
      team.goal = goal;
    }

    await team.save();

    return res
      .status(200)
      .json({ message: "Team details updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addCommentToTeam = async (req, res) => {
  const { teamId } = req.params;
  const { text, postedBy } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await User.findById(postedBy);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = { text, postedBy: user.username }; // Assuming username is the field you want to store
    team.comments.push(newComment);
    await team.save();

    return res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getComments = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const comments = team.comments.map((comment) => ({
      text: comment.text,
      postedBy: comment.postedBy,
    }));

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
