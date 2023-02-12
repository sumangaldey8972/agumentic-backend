const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const adminModel = new mongoose.model("user", adminSchema);

module.exports = adminModel;