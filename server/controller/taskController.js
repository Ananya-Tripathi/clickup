import Task from "../models/Task.js";
import User from "../models/User.js";

export const getAllTask = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find();
    if (!tasks) {
      return res.status(400).json({ message: "No task Found" });
    } else {
      return res.status(200).json({ tasks });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (req, res, next) => {
  const { heading, description, subtasks, deadline, assignedTo } = req.body;
  try {
    const user = await User.findOne({ username: assignedTo });
    if (!user) {
      return res.status(400).json({ message: "invalid username" });
    }

    const task = new Task({
      heading,
      description,
      subtasks,
      deadline,
      assignedTo: user._id,
    });

    await task.save();
    return res.status(200).json({ message: "task added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "failed" });
  }
};
export const deleteTask = async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const task = await Task.findById(_id);
    if (task) {
      return res.status(200).json({ message: "task deleted successfully" });
    } else {
      return res.status(400).json({ message: "task not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const editTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  const updates = req.body;

  try {

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.log(err);
  }
};
