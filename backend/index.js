import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

//Mongo db connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Use CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from this origin
//   })
// );
// app.use(express.json());
// app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

//Middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
