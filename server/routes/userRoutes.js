import express from "express";
import { deleteuser, getAllUser, login, signup } from "../controller/userController.js";
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/delete", deleteuser);
router.post("/login",login)

export default router;
