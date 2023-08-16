import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Moderator", "Member"],
    default: "Member",
  },
  skills: [
    {
      type: String,
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId, //creating relations
      ref: "Task",
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  taskAssigned: {
    type: Number,
    default: 0,
  },
  taskCompleted: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("User", userSchema);
