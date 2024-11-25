import Task from "../models/taskModel.js";
import { errorHandler } from "../utils/error.js";

//create task
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

//Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userRef: req.user.id }); //Get all tasks of logged in user
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//Get task by id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, "Task not found"));
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all searched tasks
export const searchTasks = async (req, res, next) => {
  try {
    let status = req.query.status || "";
    // condition if status is selected as all
    if (status === "all") {
      status = "";
    }
    let priority = req.query.priority || "";
    if (priority === "all") {
      priority = "";
    }
    let dueDate = req.query.dueDate || "";

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const tasks = await Task.find({
      userRef: req.user.id,
      $or: [
        { taskName: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
      status: { $regex: status, $options: "i" },
      priority: { $regex: priority, $options: "i" },
      dueDate: dueDate ? { $gte: dueDate } : { $ne: null },
    }).sort({ [sort]: order });

    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//Update task
export const updateTask = async (req, res, next) => {
  const {
    taskName,
    description,
    dueDate,
    status,
    comments,
    priority,
    assignedTo,
  } = req.body;

  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(errorHandler(404, "Task not found"));
  }

  if (req.user.id !== task.userRef) {
    return next(
      errorHandler(401, "You are not authorized to update this task")
    );
  }

  try {
    if (taskName) {
      task.taskName = taskName;
    }
    if (description) {
      task.description = description;
    }
    if (dueDate) {
      task.dueDate = dueDate;
    }
    if (priority) {
      task.priority = priority;
    }
    if (status) {
      task.status = status;
    }
    // if (comments) {
    //   task.comments.push({ comment: comments, userRef: req.user.id });
    // }
    if (assignedTo) {
      task.assignedTo = assignedTo;
    }

    const updatedTask = await task.save();
    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

//Delete task
export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(errorHandler(404, "Task not found"));
  }
  if (req.user.id !== task.userRef) {
    return next(
      errorHandler(401, "You are not authorized to delete this task")
    );
  }
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
