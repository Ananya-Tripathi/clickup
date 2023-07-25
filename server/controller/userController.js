import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

//next to move on to next availible middleware
// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., Gmail, Outlook, etc.
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

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

      const verificationToken = jwt.sign(
        { email: user.email },
        process.env.SECRET_KEY
      );

      // Sending the verification email
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: user.email,
        subject: "Email Verification",
        html: `Please click the following link to verify your email: <a href="http://localhost:5000/verify/${verificationToken}">Verify Email</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
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
    if (!prevUser && !isValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    jwt.sign(
      { email, userId: prevUser._id },
      "ndkfjhsenvjejsfyana",
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: prevUser._id,
          email,
        });
      }
    );
    console.log("cookie created");
    return res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    console.log(err);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "").json({ message: "cookie deleted" });
  } catch (err) {
    console.log(err);
  }
};
export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userEmail = decodedToken.email;

    // Update the user's email verification status in the database
    const ress = await User.updateOne(
      { email: userEmail },
      { $set: { verified: true } }
    );
    if (ress) {
      console.log("updated");
    } else {
      console.log("not updated");
    }
    return res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid verification token." });
  }
};


