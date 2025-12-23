import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const ComplainSchema=new mongoose.Schema({
        title:{
             type:String,
             required: true,
        },
        description:{
             type:String,
            required: true,
        },
        username:{
             type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
  complainid: { $inc: { seq: 1 } },

},{timestamps:true})


const ComplainModel = mongoose.model("complain", ComplainSchema);
export default ComplainModel;

