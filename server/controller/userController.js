import User from "../models/User.js";

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
