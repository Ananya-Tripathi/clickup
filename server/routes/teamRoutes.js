import express from "express";
import {
  getAllTeam,
  createTeam,
  deleteTeam,
} from "../controller/teamController.js";

export const teamRouter = express.Router();
teamRouter.get("/", getAllTeam);
teamRouter.post("/create", createTeam);
teamRouter.delete("/delete/:id", deleteTeam);
export default teamRouter;
