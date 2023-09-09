import express from "express";
import mongoose from "mongoose";

import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

import taskRouter from "./routes/taskRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
import router from "./routes/userRoutes.js";
const app = express();
import cookieParser from "cookie-parser";

//using cors to access 2 different port number
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//inform that we'll recieve data in json format
app.use(express.json());
app.use(cookieParser());
//informing the application that we'll be using routes
app.use("/api/user", router);
app.use("/api/task", taskRouter);
app.use("/api/team", teamRouter);


app.get("/", (req, res) => {
  res.send("whoooopss");
});
app.listen(process.env.PORT, () => {
  console.log("Welcome to ClickUp");
});

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://yana:${process.env.DB_PASS}@cluster0.4rl7uhn.mongodb.net/`
    );
    console.log("Connected to Database");
  } catch (err) {
    console.log("--Failed connection-- ");
    console.log(err);
  }
}
connectDB();
