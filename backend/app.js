import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Custom imports
import connectToDatabase from "./db/db.js";
import userRegister from "./services/user.service.js";
import LoginRoute from "./routes/user.router.js";
import addDepartment from "./routes/department.js";
import salaryRouter from "./routes/salary.js";
import empRouter from "./routes/emp.js";
import leaveRouter from "./routes/leave.js";
import setting from "./routes/setting.js";

dotenv.config();

// Connect DB + seed initial user if needed
connectToDatabase();
userRegister();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN, // local dev
      "https://employee-management-frontend-ekvj.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/upload"));

app.get("/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// API Routes
app.use("/users", LoginRoute);
app.use("/department", addDepartment);
app.use("/employee", empRouter);
app.use("/salary", salaryRouter);
app.use("/leave", leaveRouter);
app.use("/settings", setting);

// Serve React frontend (after APIs)
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

export default app;
