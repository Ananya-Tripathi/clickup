import express from "express";
import {
  deleteuser,
  getAllUser,
  login,
  logout,
  signup,
  verifyEmail,
  sendVerificationLink,
} from "../controller/userController.js";
import { isLoggedin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/delete", deleteuser);
router.post("/login", login);
router.post("/logout", isLoggedin, logout);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", sendVerificationLink);

export default router;
