import mongoose from "mongoose";

  const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
    description: {
    type: String,
    trim: true,
        
    maxlength: 500,
    },
    
},{
    timestamps: true,
}); 

const departmentModel = mongoose.model("Department", departmentSchema);
export default departmentModel;