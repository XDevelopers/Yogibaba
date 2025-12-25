import BlogModel from "../../models/BlogModel/Blog.Model.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import asyncHandler from "../../utilities/AsyncHandler.js";
import { Activestatus } from "../../../enums.js";
import { uploadToCloudinary } from "../../../contrains.js";
const addBlog = asyncHandler(async (req, res) => {
  console.log(req.body,req.file, "addprodut");
  try {
    const { description ,header} = req.body;
      if (!req.file) {
      throw new ApiError(400, "Blog image is required");
    }
    const imageUrl = await uploadToCloudinary(req.file, "blog");
    // 1️⃣ Validate input
    console.log(imageUrl, "cgh");
  
    if (!imageUrl) {
      return res.status(404).json(new ApiError(400, imageUrl, "Multer Error"));
    }
    if ( !description||!header) {
      throw new ApiError(400, "All fields are required");
    }
    console.log(req.user, req.body, "productx");

    // 2️⃣ Create product
   
    const product = await BlogModel.create({
      header,
      blogImgUrl: imageUrl,
      description,
      status: Activestatus.Active,
      createdby: req.user.userid, // comes from verifyJWT middleware
    });
    return res
      .status(201)
      .json(new ApiResponse(201, product, "Blog added successfully"));
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

const deleteBlog=asyncHandler(async(req,res)=>{
  //id se find nhi krege kr skte hi but nhi krege
    const bid= req.query.bid;
    const product=await BlogModel.findOne({blogId:bid});//done
    console.log(product , bid,'edrftgh');
    if(!product){
        throw new ApiError(400,product,"Product not found");
    }
    product.status=Activestatus.InActive
    product.save()
    // abhi na iska stsus chng krna hai smja active inactive na b uhta ha
    
    return res.status(200).json(new ApiResponse(200,product,"Deleted"));
})

export { addBlog, deleteBlog };
//ruk 5m