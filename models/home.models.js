const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  imageurl: { type: String },
});

const homeModel = new mongoose.model("image", homeSchema);
module.exports = homeModel;
