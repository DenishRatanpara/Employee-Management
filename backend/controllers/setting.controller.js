import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const changePasswordController = async (req, res) => {
  try {
    const { userId, oldpassword, newpassword } = req.body;
    console.log("UserID:", userId);

    // ✅ Use findById to get a single user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Compare old password
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // ✅ Hash new password
    const hashpassword = await bcrypt.hash(newpassword, 10);

    // ✅ Update password
    user.password = hashpassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
