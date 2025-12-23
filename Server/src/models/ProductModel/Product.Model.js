import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    itemimg: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    createdby: {
      type: Number,
      required: true,
    },
    productid: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);
const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("ProductCounter", CounterSchema);
ProductSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const counter = await Counter.findOneAndUpdate(
    { id: "productid" }, // ✅ counter name
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.productid = counter.seq;
  next();
});

const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;
