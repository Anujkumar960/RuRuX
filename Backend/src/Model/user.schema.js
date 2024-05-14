const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  stream: { type: String, required: true},
  subject: { type: [Number], default: [] },
  role: { type: String, enum: ["student", "admin"], default: "student" },
},{versionKey:false});

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};

