import mongoose from "mongoose";

//Creating comments schema
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//creating task schema
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], //enum is used to restrict the values that can be stored in a field
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    assignedTo: {
      type: String,
      required: false, // optional if assignment is not always required
    },
    // assignedTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: false, // optional if assignment is not always required
    // },
    // comments: [commentSchema],
    // Array of comments subdocuments
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
