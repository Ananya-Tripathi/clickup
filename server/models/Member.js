import mongoose from 'mongooes'
const { schema, model } = mongoose;

const memberSchema = new schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Moderator", "Member"],
    default: "Member",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId, //creating relations
      ref: "Task",
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
export default model("Member", memberSchema);
