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
  const token = req.cookies.token;
  const userId = jwt.verify(token, process.env.SECRET_KEY);
  console.log(userId);
  // try {
  //   const team = new Team({
  //     name,
  //     goal,
  //     admin: userId, // Set the admin field to the logged-in user's ID
  //   });

  //   await team.save();
  //   return res.status(200).json({ message: "Team added successfully" });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({ message: "Failed to create team" });
  // }
};

export const deleteTeam = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const team = await Team.findByIdAndRemove(id);
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
  const { memberIds } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const users = await User.find({ _id: { $in: memberIds } });

    if (users.length !== memberIds.length) {
      return res.status(404).json({ message: "One or more users not found" });
    }

    // Update the team's 'members' array and add the team ID to each user's 'teams' array
    team.members.push(...memberIds);
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

export const addCommentToTeam = async (req, res) => {
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
