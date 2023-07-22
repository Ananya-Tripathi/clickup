import express from "express";
import mongoose from "mongoose";

import router from "./routes/userRoutes.js";
const app = express();

//inform that we'll recieve data in json format
app.use(express.json())

//informing the application that we'll be using routes
app.use("/", router);

app.get("/", (req, res) => {
  res.send("whoooopss");
});
app.listen(5000, () => {
  console.log("Welcome to ClickUp");
});

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://yana:w6s9duBV8zTYN9IC@cluster0.4rl7uhn.mongodb.net/"
    );
    console.log("Connected to Database");
  } catch (err) {
    console.log("--Failed connection-- ");
    console.log(err);
  }
}
connectDB();

// password: w6s9duBV8zTYN9IC
