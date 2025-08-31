import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Custom imports
import connectToDatabase from "./db/db.js";
import userRegister from "./services/user.service.js";
import LoginRoute from "./routes/user.router.js";
import addDepartment from "./routes/department.js";
import salaryRouter from "./routes/salary.js";
import empRouter from "./routes/emp.js";
import leaveRouter from "./routes/leave.js";

dotenv.config();

// Connect DB + seed initial user if needed
connectToDatabase();
userRegister();

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "", // ✅ works locally & deployed
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/upload"));

// Routes
app.use("/users", LoginRoute);
app.use("/department", addDepartment);
app.use("/employee", empRouter);
app.use("/salary", salaryRouter);
app.use("/leave", leaveRouter);

export default app;
