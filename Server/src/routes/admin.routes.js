import { Router } from "express";
import { addProduct,deleteProduct } from "../controllers/Product/Add_DeletProduct.js";
import { addBlog,deleteBlog } from "../controllers/Blog/Add_DeletBlog.js";
import { Role } from "../../enums.js";
import { chekRole } from "../../contrains.js";
import { Login } from "../controllers/User/regester.controller.js";
import { verifyJWT } from "../../contrains.js";
import { upload } from "../utilities/upload.js";
const Adminrouter = Router();

// Adminrouter.route("/addtocart").post(chekRole(Role.Seller),addProduct);
// Adminrouter.route("/viewcart").get(chekRole(Role.Admin),ProductStatus);
// Userrouter.route("/register").post(registerUser);
Adminrouter.route("/login").post(Login);
Adminrouter.route("/addProduct").post( verifyJWT ,chekRole(Role.Admin),upload.single("image"),addProduct);// work on  multer
Adminrouter.route("/deleteProduct").delete(verifyJWT ,chekRole(Role.Admin),deleteProduct);
Adminrouter.route("/addBlog").post( verifyJWT ,chekRole(Role.Admin),upload.single("image"),addBlog);
Adminrouter.route("/deleteBlog").delete(verifyJWT ,chekRole(Role.Admin),upload.single("image"),deleteBlog);
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
