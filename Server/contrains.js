import { Role } from "./enums.js";
import { ApiResponse } from "./src/utilities/ApiResponse.js";
import { ApiError } from "./src/utilities/ApiError.js";
import UserModel from "./src/models/UsersModel/User.Model.js";
import jwt from "jsonwebtoken";
import cloudinary from "./src/utilities/cloudinary.js";

// const db_name = "E-shops";
const verifyJWT = async (req, res, next) => {
  console.log("object");
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    // 🔹 VERIFY USING MODEL METHOD
    const decoded = UserModel.verifyAccessToken(token);

    if (!decoded) {
      throw new ApiError(401, "Invalid or expired token");
    }

    // 🔹 Fetch fresh user from DB
    const user = await UserModel.findById(decoded._id).select("-password");

    if (!user) {
      console.log(user);
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const chekRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user, "chek role");
    const userRole = req.user.role;
    // set metod from fronteend
    //     fetch("http://localhost:5000/products/delete/123", {
    //   method: "DELETE",
    //   credentials: "include", // 👈 VERY IMPORTANT (cookies)
    // })
    //   axios.delete(
    //   "http://localhost:5000/products/delete/123",
    //   {
    //     withCredentials: true, // 👈 VERY IMPORTANT
    //   }
    // );
    if (userRole === Role.Admin) {
      return next();
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    req.user = req.user;
    next();
  };
};

  const uploadToCloudinary = (file, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      )
      .end(file.buffer);//gpt mar wo karke dega dekhte 
  });
};

// export { db_name, isSuperAdmin };
export { chekRole, verifyJWT,uploadToCloudinary };
