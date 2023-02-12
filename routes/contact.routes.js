const express = require("express");
const contactModel = require("../models/contactus.model");
const app = express.Router();

app.get("/get", async (req, res) => {
  try {
    let data = await contactModel.find();
    return res.status(200).send({ data: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    let { workEmail } = req.body;
    let isUser = await contactModel.findOne({ workEmail: workEmail });
    if (isUser) {
      return res
        .status(401)
        .send({ message: "oops! email already exist ! try with another" });
    } else {
      const contact = await contactModel.create(req.body);
      return res.send({
        message: "Thank you for reach out to us. we will get back to you soon",
        user: contact,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const contact = await contactModel.findByIdAndUpdate(
      req.params.id,
      { status: true },
      { new: true }
    );
    return res.send({ message: "status updated!", user: contact });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = app;
