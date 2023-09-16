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
    return res.status(200).json(users);
  }
};

export const deleteuser = async (req, res, next) => {
  const { email, password } = req.body;
  let prevUser;
  try {
    prevUser = await User.findOne({ email });
    const isValid = bcrypt.compareSync(password, prevUser.password);
    if (!prevUser || !isValid) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const del = await User.deleteOne({ _id: prevUser._id });
      if (del) {
        return res.status(200).json({ message: "User removed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export const sendVerificationLink = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log("token", verificationToken);
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Email Verification",
      html: `<p>Please click the following link to verify your email:</p><a href="http://localhost:5000/api/user/verify/${verificationToken}">Verify Email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to resend verification email." });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({
          message:
            "Verification link resent successfully. Please check your email.",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if the user or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long." });
    }

    const hashedPass = bcrypt.hashSync(password);
    const user = new User({
      name,
      username,
      email,
      password: hashedPass,
    });

    await user.save();

    // await sendVerificationLink(user.email);
    return res.status(200).json({
      message: "Signup successful",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
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
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let prevUser;
    prevUser = await User.findOne({ email });
    const isValid = bcrypt.compareSync(password, prevUser.password);
    if (!prevUser || !isValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { email, userId: prevUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: "true" });
    return res
      .status(200)
      .json({ message: "Login Successfull", id: prevUser._id });
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
