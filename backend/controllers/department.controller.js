import departmentModel from "../models/department.model.js";

export const addDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;

  

    const newDepartment = new departmentModel({
      departmentName,
      description,
    });

    await newDepartment.save();

    res.status(201).json({
      message: "Department added successfully",
      department: newDepartment,
    });

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(409).json({
        message: `Department "${req.body.departmentName}" already exists.`,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Error adding department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find();
        res.status(200).json(departments);
    } catch (error) {

        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
// export const editDepartment=async (req,res)=>{
//   try {
//     const {id}=req.params;
//     console.log(id)
//     const department=await departmentModel.findOne({ _id: id })
//         res.status(200).json(department);
    
//   } catch (error) {
//     console.log(error)
//     res.status(400).json("internel server error")
    
//   }
// }
export const updateDepartment=async (req,res)=>{
  try {
    const {id}=req.params;
  const {departmentName,description}=req.body;

  const updateDept=await departmentModel.findByIdAndUpdate({_id:id},{
    departmentName,
    description,
  })

  res.status(200).json(updateDept);
    
  } catch (error) {
     console.log(error)
    res.status(400).json("internel server error")
    
  }
}
export const deleteDepartment=async (req,res)=>{
  try {
    const {id}=req.params;
  

  const deleteDept=await departmentModel.findByIdAndDelete({_id:id} )
 
  res.status(200).json(deleteDept);
    
  } catch (error) {
     console.log(error)
    res.status(400).json("internel server error")
    
  }

}


