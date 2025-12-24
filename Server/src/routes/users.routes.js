import { Router } from "express";
import { Role } from "../../enums.js";
import { Login,RegisterUser } from "../controllers/User/regester.controller.js";
import { IsAuthenticated } from "../meddleWare/Authenticated.js";
// import {isSuperAdmin} from '../../contrains.js'
import { chekRole } from "../../contrains.js";
const Userrouter = Router();

// router.route("/inactiveToActive").get(InactiveToActive);
// router.route("/otpValidation").post(IsAuthenticated, verifyOTP);
// router.route("/activeRegister").post(IsAuthenticated);
// router.route("/otpValidation").post(IsAuthenticated, verif);
// router.route("/changeusertypeadmin").post(Login);
// router.route("/logout").post(logoutUser)

Userrouter.route("/register").post(RegisterUser);
Userrouter.route("/login").post(Login);
// Userrouter.route("/viewProducts").get(viewProducts);
// Userrouter.route("/viewBlogs").get(viewBlogs);
// Userrouter.route("/placeOrder").post(placeOrder);
// Userrouter.route("/orderSummary").post(orderSummary);
// Userrouter.route("/addToCart").post(addToCart);
// Userrouter.route("/removeFromCart").post(removeFromCart);

export default Userrouter;
