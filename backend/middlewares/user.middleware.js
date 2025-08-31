import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

<<<<<<< HEAD

const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

      // console.log("access:  ",req.cookies?.accessToken, "refresh: ",req.cookies?.refreshToken);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-password ");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
=======
 // adjust path to your user model

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

>>>>>>> 4bb929cc08404bbaadf32b02a88520d0ae01e6f8
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
<<<<<<< HEAD
    // if (error.name === "TokenExpiredError") {
    //   return res.status(401).json({ message: "Access token expired" });
    // }
    
=======
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
>>>>>>> 4bb929cc08404bbaadf32b02a88520d0ae01e6f8
  }
};

export default verifyUser;
