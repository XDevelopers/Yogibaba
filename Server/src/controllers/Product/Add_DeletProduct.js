import ProductModel from "../../models/ProductModel/Product.Model.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandler.js";
import { Activestatus } from "../../../enums.js";
import { uploadToCloudinary } from "../../../contrains.js";
const addProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "addprodut");
  try {
    const { itemname, itemimg, description } = req.body;
    const imageUrl = await uploadToCloudinary(req.file, "products");
    // 1️⃣ Validate input
    console.log(imageUrl, "cgh");
    if (!imageUrl) {
      return res.status(404).json(new ApiError(400, imageUrl, "Multer Error"));
    }
    if (!itemname || !itemimg || !description) {
      throw new ApiError(400, "All fields are required");
    }
    console.log(req.user, req.body, "productx");

    // 2️⃣ Create product
    console.log(
      itemname,
      itemimg,
      description,
      Activestatus.Active,
      req.user.userid
    );
    const product = await ProductModel.create({
      itemname,
      itemimg: imageUrl,
      description,
      status: Activestatus.Active,
      createdby: req.user.userid, // comes from verifyJWT middleware
    });

    // 3️⃣ Response
    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product added successfully"));
  } catch (error) {
    return res
      .status(404)
      .json(new ApiError(400, error, "Product added successfully", null));
  }
});

export { addProduct };
