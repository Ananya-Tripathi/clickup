import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log(req.cookies);
    if (!token) {
      console.log("Log in first");
      return res.status(400).json({ message: "Not Logged in" });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await User.findById(user.userId);

    if (!loggedInUser) {
      console.log("Not found");
      return res.status(400).json({ message: "User not found" });
    }

    // Store the user object in the request for future use
    req.user = loggedInUser;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role === "Admin") {
      // User is an admin, proceed to the next middleware
      next();
    } else {
      // User is not an admin, return a forbidden response
      return res.status(403).json({ message: "Access forbidden" });
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
