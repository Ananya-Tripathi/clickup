import mongoose from "mongoose";
const schema = mongoose.Schema;

const taskSchema = new schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  subtasks: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["Assigned", "Ongoing", "Completed"],
    default: "Assigned",
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Team"
  },
});
export default mongoose.model("Task", taskSchema);
