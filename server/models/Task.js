import mongoose from 'mongooes'
const { schema, model } = mongoose;

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
  assigned: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});
export default model("Task", taskSchema);
