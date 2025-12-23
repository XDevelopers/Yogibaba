import ProductModel from "../../models/ProductModel/Product.Model.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandler.js";
// import { ProductStatus } from "../../../enums.js";
const ProductStatus = asyncHandler(async (req, res) => {
  console.log(req.body, "addprodut");
  const { itemname, itemimg, description } = req.body;

  // 1️⃣ Validate input
  if (!itemname || !itemimg || !description) {
    throw new ApiError(400, "All fields are required");
  }
  console.log(req.user, req.body, "productx");

  // 2️⃣ Create product
  console.log(itemname,itemimg,description,ProductStatus.Pending,req.user.userid);
  const product = await ProductModel.create({
    itemname,
    itemimg,
    description,
    status: ProductStatus.Pending,
    createdby: req.user.userid, // comes from verifyJWT middleware
  });

  // 3️⃣ Response
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

export { ProductStatus };
