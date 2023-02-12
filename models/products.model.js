const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  productimage:{type: String, required: true},
  brief:{type: String, required: true}
});

const productModel = new mongoose.model("product", productSchema);
module.exports = productModel;
