import User from "../models/User.js";
import bcrypt from "bcryptjs";
//next to move on to next availible middleware
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  } else {
    return res.status(200).json({ users });
  }
};

export const deleteuser = async (req, res, next) => {
  const { email, password } = req.body;
  let prevUser;
  try {
    prevUser = await User.findOne({ email });
    if (!prevUser) {
      return res.status(400).json({ message: "User not found" });
    } else {
      await User.deleteOne(prevUser);
      return res.status(200).json({ message: "User removed" });
    }
  } catch (err) {
    console.log(err);
  }
};
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let prevUser;
  try {
    prevUser = await User.findOne({ email });

    if (prevUser || password.length < 8) {
      return res.status(400).json({ message: "Invalid Entry" });
    } else {
      const hashedPass = bcrypt.hashSync(password);
      //Creating object using details from frontend and defined schema
      const user = new User({
        name,
        email,
        password: hashedPass,
      });

      await user.save();
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let prevUser;
  try {
    prevUser = await User.findOne({ email });
    const isValid = bcrypt.compareSync(password, prevUser.password);
    if (!prevUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    return res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    console.log(err);
  }
};
