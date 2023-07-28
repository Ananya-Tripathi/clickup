import Team from "../models/Team.js";
import User from "../models/User.js";

export const getAllTeam = async (req, res, next) => {
  let teams;
  try {
    teams = await Team.find();

    if (!teams) {
      return res.status(400).json({ message: "No Team Found" });
    } else {
      return res.status(200).json({ teams });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTeam = async (req, res, next) => {
  const { name, goal, members } = req.body;
  try {
    const memberIds = await User.find({ username: { $in: members } }).distinct("_id");

    const team = new Team({
      name,
      goal,
      members: memberIds
    });

    await team.save();
    return res.status(200).json({ message: "Team added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "failed" });
  }
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

export const editTeam = async (req, res, next) => {
  const TeamId = req.params.TeamId;
  const updates = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(TeamId, updates, {
      new: true,
    });

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(200).json({ message: "Team updated successfully" });
  } catch (err) {
    console.log(err);
  }
};
