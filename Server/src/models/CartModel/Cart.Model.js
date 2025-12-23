import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const DeliverySchema=new mongoose.Schema({
        productids:{
             type:Number,
             tags:[Number]
        },
        username:{
             type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
  ucartid: { $inc: { seq: 1 } },

},{timestamps:true})


const DeliveryModel = mongoose.model("Deliverys", DeliverySchema);
export default DeliveryModel;

