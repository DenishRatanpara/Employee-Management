import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userMiddleware from "../middlewares/user.middleware.js";

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("req.bidy", req.body);
    
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    user.refreshToken = refreshToken;
    user.save();

    const options = {
      httpOnly: true,
      secure: false, // must be false since localhost is not HTTPS
        sameSite: "lax", // works fine for dev
      //   path: "/",
    };

    res
      .status(200)
      .cookie("accessToken", token, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    console.log("access token: ", req.cookies.accessToken);
    console.log("refresh token: ", req.cookies.refreshToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const LogoutController = async (req, res) => {
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    // secure: true
  };

  res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "logged out successfully",
    });
};

export const refreshAccessToken = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await userModel.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.status(201, "user not found");
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    res.cookie("accessToken", newAccessToken, options).json({
      message: "new access token generated",
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token, please login again"
    })
  }
};

export const verify = async (req, res) => {
  return res.status(200).json({
    user: req.user,
    message: "User verified successfully",
  });
};
