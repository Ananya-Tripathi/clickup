import express from "express";
import {
  getAllTeam,
  createTeam,
  deleteTeam,
  getMembers,
  addMembersToTeam,
  deleteMemberFromTeam,
  getTeamData,
  updateTeamDetails,
  addCommentToTeam,
  getComments,
} from "../controller/teamController.js";
// import { checkAdmin, checkLoggedIn } from "../middleware/auth.js";
export const teamRouter = express.Router();
teamRouter.get("/", getAllTeam);
teamRouter.post("/create", createTeam);
teamRouter.get("/:teamId/members", getMembers);
teamRouter.delete("/:teamName/delete", deleteTeam);
teamRouter.post("/:teamId/add-members", addMembersToTeam);
teamRouter.delete("/:teamId/delete-member/:memberId", deleteMemberFromTeam);
teamRouter.get("/:teamId/getTeamData", getTeamData);
teamRouter.put("/:teamName/edit", updateTeamDetails);
teamRouter.get("/:teamId/getComments", getComments);
teamRouter.post("/:teamId/addComment", addCommentToTeam);

export default teamRouter;
