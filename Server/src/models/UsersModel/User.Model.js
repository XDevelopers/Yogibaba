import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  isverifyed: {
    type: Number,
    enum: [1, 2],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  password: {
    type: String,
    required: true,
  },
    userid: {
    type: Number,   // JUST A TYPE — no $inc here!
  },
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("UserCounter", CounterSchema);

UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const counter = await Counter.findOneAndUpdate(
    { id: "userid" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  this.userid = counter.seq;
  next();
});

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
       role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
UserSchema.statics.verifyAccessToken = function (token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
