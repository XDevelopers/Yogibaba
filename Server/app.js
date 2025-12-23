import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());
import { Role } from "./enums.js";

//rotues
import Adminrouter from "./src/routes/admin.routes.js";
import Userrouter from "./src/routes/users.routes.js";
import { verifyJWT } from "./contrains.js"; 

// app.use("/cart",IsloggedIn, chekRole(Role.SuperAdmin),Cartrouter)//here we how chek frst user is login or not  secnd is usr suprtadmin and ten give access
app.use("/admin",Adminrouter)
app.use("/user",Userrouter)

export { app };
