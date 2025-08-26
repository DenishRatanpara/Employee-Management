import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userRegister = async () => {
  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ email: "denish@d.com" });

    if (existingUser) {
      console.log("Admin user already exists.");
      return; // Exit the function if user exists
    }

    const hashedPassword = await bcrypt.hash("denish", 10);
    const newUser = new User({
      // name: "Admin",
      // email: "admin@a.com",
      // password: hashedPassword,
      // role: "admin",
       name: "Admin",
      email: "denish@d.com",
      password: hashedPassword,
      role: "admin"

    });

    await newUser.save();
    console.log("Admin user registered successfully.");
  } catch (error) {
    console.error("Error in userRegister:", error);
  }
};

userRegister();
export default userRegister;
