import express from "express";
import {
  deleteuser,
  getAllUser,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/delete", deleteuser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify/:token", verifyEmail);

export default router;
