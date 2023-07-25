import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
import router from "./routes/userRoutes.js";
const app = express();

//inform that we'll recieve data in json format
app.use(express.json());

//informing the application that we'll be using routes
app.use("/", router);

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
