import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Not Logged in" });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await User.findById(user._id);

    if (!loggedInUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Store the user object in the request for future use
    req.user = loggedInUser;

    next();
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
