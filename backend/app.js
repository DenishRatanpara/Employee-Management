import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';    
import connectToDatabase from './db/db.js';
import userRegister from './services/user.service.js';
import LoginRoute from './routes/user.router.js';
import addDepartment from './routes/department.js';
import empRouter from "./routes/emp.js"


connectToDatabase();
userRegister();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users',LoginRoute)

app.use('/department',addDepartment)
app.use('/employee',empRouter);
app.use(express.json());
app.use(express.static("public/upload"))
app.use(express.urlencoded({ extended: true }));

export default app;