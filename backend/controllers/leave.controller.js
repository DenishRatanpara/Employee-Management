import Leave from "../models/leave.model.js";
import Employee from "../models/emp.model.js";

export const applyLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, reason } = req.body;

    // Check required fields
    if (!userId || !leaveType || !fromDate || !toDate) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Find employee by userId
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Create new leave
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();

    res.status(201).json({
      message: "Leave applied successfully",
      leave: newLeave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message)
  }
};

export const FatchLeave = async (req, res) => {
  try {
    // userId is already set by verifyUser middleware
    const {id}=req.params;
const employee = await Employee.findOne({ userId:id });
    const leaves = await Leave.find({ employeeId:employee.id });
    res.status(200).json({
      message: "Leave fetch successful",
      leaves,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

