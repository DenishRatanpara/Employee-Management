import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userMiddleware from '../middlewares/user.middleware.js';


export const LoginController =async (req, res) => {
    try {
        const{email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user) { 
            res.status(404).json({message:"User not found"});
        }
        
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword) {
            res.status(401).json({message:"Invalid password"});
        }
        const token=jwt.sign({_id:user._id, role:user.role},
            process.env.JWT_SECRET ,{
                expiresIn:"10d"
            }
        )
        res.status(200).json({
            message:"Login successful",
            token,  
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}
export const verify=async (req, res) => {
    return res.status(200).json({
        user: req.user,
        message: "User verified successfully"
    });

}

