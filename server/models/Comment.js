import mongoose from 'mongooes'
const { schema, model } = mongoose;

const commentSchema = new schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
export default model("Comment", commentSchema);
