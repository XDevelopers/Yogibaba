import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const DeliverySchema=new mongoose.Schema({
          delivertouserId:{
             type:Number,
        },
        itemname:{
          type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        deliverystatus:{
            type:Number,
            required:true,
            enum: [1,2,3],
        },
        deliveryboy:{
             type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
  deleveryid: { $inc: { seq: 1 } },

},{timestamps:true})


const DeliveryModel = mongoose.model("Deliverys", DeliverySchema);
export default DeliveryModel;

