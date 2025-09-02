import mongoose from "mongoose";



const empSchema = new mongoose.Schema({
  name: {
    type: String
  },
  userId: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type:mongoose. Schema.Types.ObjectId, ref: "Department", required: true },
  salary: { type: Number, required: true },
  phone: { type: Number, required: true },
});
const Employee=new mongoose.model("Employee",empSchema);
export default Employee;