import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  searchTasks,
} from "../controllers/taskController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createTask", verifyToken, createTask);
router.post("/updateTask/:id", verifyToken, updateTask);
router.delete("/deleteTask/:id", verifyToken, deleteTask);
router.get("/getAllTasks", verifyToken, getAllTasks);
router.get("/getTaskById/:id", verifyToken, getTaskById);
router.get("/searchTasks/", verifyToken, searchTasks);

export default router;
