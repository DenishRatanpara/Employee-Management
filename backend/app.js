import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';    
import connectToDatabase from './db/db.js';
import userRegister from './services/user.service.js';
import LoginRoute from './routes/user.router.js';
import addDepartment from './routes/department.js';
import salaryRouter from './routes/salary.js';
import empRouter from "./routes/emp.js"
<<<<<<< HEAD
import cookieParser from 'cookie-parser';
=======
import leaveRouter from "./routes/leave.js"
>>>>>>> 4bb929cc08404bbaadf32b02a88520d0ae01e6f8


connectToDatabase();
userRegister();

const app = express();

// app.use(cors());
// app.use(bodyParser.json());

app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


<<<<<<< HEAD
=======
app.use('/department',addDepartment)
app.use('/employee',empRouter);
app.use('/salary', salaryRouter);
app.use('/leave',leaveRouter)
>>>>>>> 4bb929cc08404bbaadf32b02a88520d0ae01e6f8
app.use(express.json());
app.use(express.static("public/upload"))
app.use(express.urlencoded({ extended: true }));

app.use('/users',LoginRoute)
app.use('/department',addDepartment)
app.use('/employee',empRouter);
app.use('/salary', salaryRouter);

export default app;