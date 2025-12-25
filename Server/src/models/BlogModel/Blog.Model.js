import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    blogImgUrl: {
      type: String,
      required: true,
    },
    header: {
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
      enum: [46, 47],
    },
    createdby: {
      type: Number,
      required: true,
    },
    blogId: {
      type: Number,
    },
  },
  { timestamps: true }
);
const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("BlogCounter", CounterSchema);
BlogSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const counter = await Counter.findOneAndUpdate(
    { id: "blogId" }, // ✅ counter name
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.blogId = counter.seq;
  next();
});

const BlogModel = mongoose.model("blog", BlogSchema);
export default BlogModel;
