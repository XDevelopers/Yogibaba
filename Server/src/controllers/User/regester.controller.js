import asynHandler from "../../utilities/AsyncHandler.js";
import UserModel from "../../models/UsersModel/User.Model.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import bcrypt from "bcrypt";
import {Activestatus,Role} from '../../../enums.js'

const RegisterUser = asynHandler(async (req, res) => {
  const { username, email, password,role } = req.body;

  // Validate inputs
  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "All fields are required");
  }
  const existedemalUser = await UserModel.findOne({ email });
  const existednameUser = await UserModel.findOne({ username });
  if (existedemalUser) {
    throw new ApiError(400, "email already exists");
  }
  if (existednameUser) {
    throw new ApiError(400, "Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  //  const otp = Math.floor(100000 + Math.random() * 900000);
  // const otpExpiry = Date.now() + 10 * 60 * 1000;
  const newUser = {
    username,
    isverifyed:Activestatus.InActive,
    email,
    role:Role.User,
    password:hashedPassword,
  };
  const createdUser = await UserModel.create(newUser);
  console.log("createdUser", createdUser);
  res.cookie("pendingUserId", createdUser.id.toString(), {
    httpOnly: true,
    secure: true, // true if using HTTPS
    sameSite: "Strict",
    maxAge: 10 * 60 * 100000, // 10 minutes
  });

  if (!createdUser) {
    throw new ApiError(500, "Error in registration");
  }
  console.log(newUser);
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created successfully"));
});

const Login = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  const newuser = await UserModel.findOne({ email });
  console.log(newuser);
  if (!newuser) {
    throw new ApiError(404, "User not found");
  }

  // Verify password
  const isPasswordCorrect = await newuser.isPasswordCorrect(password); //ispasswordcorrect
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens
  const accessToken = newuser.generateAccessToken();
  const refreshToken = newuser.generateRefreshToken();

  // Save refresh token in DB
  newuser.refreshToken = refreshToken;
  await newuser.save({ validateBeforeSave: false });

  // Send cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: newuser,
          accessToken,
          refreshToken,
        },
        "User login successfully"
      )
    );
});
// const verifyOTP = asynHandler(async (req, res) => {
//   const { code } = req.body;
//   const email = req.cookies.pendingUserId;
//   const user = await inactiveusers.findOne({ email });

//   if (!user) throw new ApiError(404, "User not found");

//   // Check if otp expired

//   // Validate OTP
//   if (user.verificationCode !== code) {
//     throw new ApiError(400, "Invalid OTP");
//   }

//   // Mark user as verified
//   user.isVerified = true;
//   user.verificationCode = null;
//   user.verificationExpires = null;

//   await user.save();

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Account verified successfully"));
// });

export { RegisterUser, Login };
// export { InActiveRegister, ActiveRegister, InactiveToActive, Login, verifyOTP };
