import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "Not Logged in" });
  }
  const user = jwt.verify("token", process.env.SECRET_KEY);
  await User.findById(user._id);
  next();
};
