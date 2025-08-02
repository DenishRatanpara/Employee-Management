import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, required:true,ref:'Employee',
    },
    basicSalary: {
        type: Number, required:true,    
    },
    allowance: {

        type: Number, default: 0,
    },
    deductions: {
        type: Number, default: 0,

    },
    netSalary: {
        type: Number, required:true,
    },
    paymentDate: {
        type: Date, default: Date.now,
    },
}, { timestamps: true });   


const salaryModel = mongoose.model("Salary", salarySchema);

export default salaryModel;