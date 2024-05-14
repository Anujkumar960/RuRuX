const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  streamId: { type: Number, ref: 'streams'},
  subjectId: { type: [Number], ref: 'subjects', default: [] },
  role: { type: String, enum: ["student", "admin"], default: "student" },
},{versionKey:false});

const UserModel = mongoose.model("student", userSchema);

module.exports = {UserModel};

