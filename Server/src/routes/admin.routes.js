import { Router } from "express";
import { addProduct } from "../controllers/Product/Add_DeletProduct.js";
import { Role } from "../../enums.js";
import { chekRole } from "../../contrains.js";
import { ProductStatus } from "../controllers/Product/ProductStatus.js";
import { Login } from "../controllers/User/regester.controller.js";
import { verifyJWT } from "../../contrains.js";
import { upload } from "../utilities/upload.js";
const Adminrouter = Router();

// Adminrouter.route("/addtocart").post(chekRole(Role.Seller),addProduct);
// Adminrouter.route("/viewcart").get(chekRole(Role.Admin),ProductStatus);
// Userrouter.route("/register").post(registerUser);
Adminrouter.route("/login").post(Login);
Adminrouter.route("/addProduct").post( verifyJWT ,chekRole(Role.Admin),upload.single("image"),addProduct);
// Adminrouter.route("/deleteProduct").post(deleteProduct);
// Adminrouter.route("/addBlog").post(addBlog);
// Adminrouter.route("/deleteBlog").post(deleteBlog);
// Adminrouter.route("/addUser").post(addUser);
// Adminrouter.route("/deleteUser").post(deleteUser);
// Adminrouter.route("/viewProducts").get(viewProducts);
// Adminrouter.route("/viewBlogs").get(viewBlogs);
// Adminrouter.route("/viewOrders").get(viewOrders);
// Adminrouter.route("/viewAllUsers").get(viewAllUsers);
// Adminrouter.route("/viewCart").get(viewCart);


// Adminrouter.route("/OrderSummery").post(Login);
// Adminrouter.route("/AddToCart").post(Login);
// router.route("/viewcartbyuser").get();

export default Adminrouter;
