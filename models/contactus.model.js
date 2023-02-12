const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  workEmail: { type: String, unique: true, required: true },
  message: { type: String, required: true, maxlength: 250 },
  status: { type: Boolean, default: false },
});

const contactModel = new mongoose.model("contact", contactSchema);

module.exports = contactModel;
