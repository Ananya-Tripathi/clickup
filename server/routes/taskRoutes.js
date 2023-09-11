import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
} from "../controller/taskController.js";
// import { checkAdmin, checkLoggedIn } from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.get("/", getAllTask);
taskRouter.post("/create", createTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.put("/edit/:taskId", editTask);
export default taskRouter;
