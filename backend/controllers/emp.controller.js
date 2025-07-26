import Employee from "../models/emp.model.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const EmpAddController = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      employeeId,
      dob,
      gender,
      designation,
      department,
      salary,
      phone,
      password,
    } = req.body;

    // Check for required fields
    if (
      !name || !email || !password || !role ||
      !employeeId || !dob || !gender ||
      !designation || !department || !salary
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists with this email.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "", // Make sure multer is setup correctly
    });

    const savedUser = await newUser.save();

    // Create employee record
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      phone,
      gender,
      designation,
      department, // ensure ObjectId is sent from frontend
      salary,
    });

    await newEmployee.save();

    res.status(200).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("EmpAddController Error:", error);

    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const getEmployeeController = async (req,res)=>{
   try {
        const employees = await Employee.find().populate("userId").populate("department");
        res.status(200).json(employees);
    } catch (error) {

        console.error("Error fetching Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const ShowEmployeeController = async (req,res)=>{
  const {id}=req.params;
   try {
        const employees = await Employee.findById({_id:id}).populate("userId").populate("department");
        res.status(200).json(employees);
    } catch (error) {

        console.error("Error fetching Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


// export const EmpUpdateController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       email,
//       phone,
//       department,
//       designation,
//       role,
//       salary,
//     } = req.body;

    
//     const employee = await Employee.findById(_id.id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     const user=await userModel.findById(_id.employee.userId)
//    if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
  
//     if (employee.userId) {
//       await user.findByIdAndUpdate(employee.userId, {
//         name,
        
//       });
//     }

   
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       _id.id,
//       {
//         department,
//         designation,
//         role,
//         salary,
//       },
//       { new: true } 
//     ).populate("userId");

//     res.status(200).json(updatedEmployee);
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const EmpUpdateController = async (req, res) => {
  try {
    const { id } = req.params; // employee id from URL
    const {
      name,
      email,
      phone,
      department,
      designation,
      role,
      salary,
    } = req.body;

    // Find the employee by id
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the user associated with the employee
    const user = await userModel.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    await userModel.findByIdAndUpdate(employee.userId, {
      name,
      email,
      phone,
    });

    // Update employee data
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        department,
        designation,
        role,
        salary,
      },
      { new: true }
    ).populate("userId");

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
