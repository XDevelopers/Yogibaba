import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const OrdersSchema = new mongoose.Schema(
  {
    itemid: {
      type: Number,
    },
    createdbysuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    assingrtodelever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    ucartid: { $inc: { seq: 1 } },
  },
  { timestamps: true }
);

const OrdersModel = mongoose.model("Orders", OrdersSchema);
export default OrdersModel;
