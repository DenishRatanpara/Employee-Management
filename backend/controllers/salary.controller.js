import salaryModel from '../models/salary.model.js';

export const addSalaryController = async (req, res) => {
    try {

        const { employeeId, basicSalary, allowance, deductions } = req.body;
      const totalSalary = parseInt(basicSalary) +parseInt(allowance) - parseInt(deductions);
        const newSalary = new salaryModel({
            employeeId,
            basicSalary,
            allowance,
            deductions,
            netSalary : totalSalary,
            paymentDate: new Date()
        }); 
        await newSalary.save();

        res.status(201).json({
            success: true,
            message: "Salary added successfully",
            data: newSalary
        });
        
    } catch (error) {
        console.error("Error adding salary:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add salary",
            error: error.message
        });

        
    }
}