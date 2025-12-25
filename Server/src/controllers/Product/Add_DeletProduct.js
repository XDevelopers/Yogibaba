import ProductModel from "../../models/ProductModel/Product.Model.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandler.js";
import { Activestatus } from "../../../enums.js";
import { uploadToCloudinary } from "../../../contrains.js";
const addProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "addprodut");
  try {
    const { itemname, description } = req.body;
      if (!req.file) {
      throw new ApiError(400, "Product image is required");
    }
    const imageUrl = await uploadToCloudinary(req.file, "products");
    // 1️⃣ Validate input
    console.log(imageUrl, "cgh");
  
    if (!imageUrl) {
      return res.status(404).json(new ApiError(400, imageUrl, "Multer Error"));
    }
    if (!itemname  || !description) {
      throw new ApiError(400, "All fields are required");
    }
    console.log(req.user, req.body, "productx");

    // 2️⃣ Create product
    console.log({
      itemname,
      itemimg : imageUrl,
      description,
     status: Activestatus.Active,
      createdby: req.user.userid,
  });
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
      .status(error.statusCode || 400)
      .json(
        new ApiError(
          error.statusCode || 400,
          error.message || "Something went wrong"
        )
      );
  }
});

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const product=await ProductModel.findByIdAndDelete(id);
    if(!product){
        throw new ApiError(400,"Product not found");
    }
    return res.status(200).json(new ApiResponse(200,product,"Product deleted successfully"));
})

export { addProduct, deleteProduct };
