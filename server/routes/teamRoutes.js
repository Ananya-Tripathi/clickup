import express from "express";
import {
  getAllTeam,
  createTeam,
  deleteTeam,
  getMembers,
  addMembersToTeam,
  deleteMemberFromTeam,
  addCommentToTeam,
  getTeamData,
} from "../controller/teamController.js";
import { checkLoggedIn } from "../middleware/auth.js";
export const teamRouter = express.Router();
teamRouter.get("/", getAllTeam);
teamRouter.post("/create", checkLoggedIn, createTeam);
teamRouter.get("/:teamId/members", getMembers);
teamRouter.delete("/delete/:id", deleteTeam);
teamRouter.post("/:teamId/add-members", addMembersToTeam);
teamRouter.delete("/:teamId/delete-member/:memberId", deleteMemberFromTeam);
teamRouter.post("/:teamId/add-comment", addCommentToTeam);
teamRouter.get("/:teamId/getTeamData", getTeamData);


export default teamRouter;
