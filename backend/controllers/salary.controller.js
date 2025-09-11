import salaryModel from '../models/salary.model.js';
import Employee from '../models/user.model.js';
import mongoose from 'mongoose';

export const addSalaryController = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowance = 0, deductions = 0 } = req.body;

        // Validate employeeId
        if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing employeeId.",
            });
        }

        // Ensure numeric values
        const parsedBasic = Number(basicSalary);
        const parsedAllowance = Number(allowance);
        const parsedDeductions = Number(deductions);

        if (isNaN(parsedBasic) || isNaN(parsedAllowance) || isNaN(parsedDeductions)) {
            return res.status(400).json({
                success: false,
                message: "Salary, allowance, and deductions must be valid numbers.",
            });
        }

        const netSalary = parsedBasic + parsedAllowance - parsedDeductions;

        const newSalary = new salaryModel({
            employeeId,
            basicSalary: parsedBasic,
            allowance: parsedAllowance,
            deductions: parsedDeductions,
            netSalary,
            paymentDate: new Date(),
        });

        await newSalary.save();

        res.status(201).json({
            success: true,
            message: "Salary added successfully",
          
        });

    } catch (error) {
        console.error("Error adding salary:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add salary",
            error: error.message
        });
    }
};
// export const showSalaryController = async (req, res) => {
//   const { id } = req.params;
//   console.log("ID:", id);
//   try {
//     let salaryDetail = await salaryModel
//       .find({ employeeId: id })
//       .populate("employeeId", "employeeId");
//       console.log("Salary Detail:", salaryDetail);
      

//     if (!salaryDetail || salaryDetail.length < 1) {
//       const employee = await Employee.findOne({ userId: id });
//       console.log("Employee:", employee);
//       if (!employee) {
//         return res.status(404).json({ message: "Employee not found" });
//       }
//       salaryDetail = await salaryModel
//         .find({ employeeId: employee._id })
//         .populate("employeeId", "employeeId");
//     }

//     res.status(200).json({ salary: salaryDetail });
//   } catch (error) {
//     console.error("Error fetching Employee:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const showSalaryController = async (req, res) => {
//   const { id } = req.params;
 
//   try {
//     // Try to find salary by employeeId first
//     let salaryDetail = await salaryModel
//       .find({ employeeId: id }) // salary document has employeeId
//       .populate("employeeId", "name email employeeId"); // populate fields
//     console.log("Salary Detail:", salaryDetail);

//     // If not found, try finding Employee by userId
  
//     res.status(200).json({ salary: salaryDetail });
//   } catch (error) {
//     console.error("Error fetching Employee:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const ShowSalaryByUserId = async (req, res) => {
//   const { id } = req.params;
//   console.log("User ID:", id);

//   try {
   

// const salaries = await salaryModel.findOne()
//   .populate({
//     path: "employeeId",
//     match: { userId: id}, 
//     populate: { path: "userId" } 
//   });
//   console.log({salaries})


//     return res.status(200).json({ salary: salaries });
//   } catch (error) {
//     console.error("Error fetching Employee:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const showSalary = async (req, res) => {
  const { id } = req.params;
  console.log("ID:", id);

  try {

    let salaryDetail = await salaryModel
      .find({ employeeId: id })
      .populate("employeeId", "name email userId");

    if (salaryDetail && salaryDetail.length > 0) {
      console.log("Found by employeeId:", salaryDetail);
      return res.status(200).json({ salary: salaryDetail });
    }

    
    const salaryByUser = await salaryModel
      .find()
      .populate({
        path: "employeeId",
        match: { userId: id },
        populate: { path: "userId", select: "name email" },
      });

    const filtered = salaryByUser.filter(s => s.employeeId); 

    console.log("Found by userId:", filtered);

    return res.status(200).json({ salary: filtered });
  } catch (error) {
    console.error("Error fetching Salary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
