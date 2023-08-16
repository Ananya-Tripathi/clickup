import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import * as dotenv from "dotenv";
dotenv.config();
import taskRouter from "./routes/taskRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
import router from "./routes/userRoutes.js";
const app = express();

//inform that we'll recieve data in json format
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true, // Use default-src as a fallback for other directives
    directives: {
      // Add 'unsafe-inline' to script-src for allowing inline scripts
      "script-src": ["'self'", "'unsafe-inline'"],
      // Add 'unsafe-inline' to style-src for allowing inline styles
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  })
);

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
