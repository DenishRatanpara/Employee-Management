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
//   try {
//     let salaryDetail = await salaryModel
//       .find({ employeeId: id })
//       .populate("employeeId", "employeeId");
      

//     if (!salaryDetail || salaryDetail.length < 1) {
//       const employee = await Employee.findOne({ userId: id });
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

export const showSalaryController = async (req, res) => {
  const { id } = req.params; // can be employeeId or userId
    console.log("📩 Received ID from params:", id);

  try {
    // 1️⃣ First try: assume id is an employeeId (_id of Employee collection)
    let salaryDetail = await salaryModel
      .find({ employeeId: id })
      .populate("employeeId", "employeeId");
      console.log()

    // 2️⃣ If nothing found, try treating id as userId (lookup Employee first)
    if (!salaryDetail || salaryDetail.length < 1) {
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

 salaryDetail = await salaryModel
  .find({ employeeId: employee._id }) // ✅ correct usage
  .populate("employeeId", "employeeId");

    }
    console.log("💰 Fetched Salary Details:", salaryDetail);
    // 3️⃣ Return salary records
    res.status(200).json({ salary: salaryDetail });
  } catch (error) {
    console.error("Error fetching Employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



