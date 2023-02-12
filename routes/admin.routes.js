const express = require("express");
const adminModel = require("../models/admin.model");
const app = express.Router();
const token = require("jsonwebtoken");

app.post("/signup", async (req, res) => {
  try {
    let admin = await adminModel.create(req.body);
    return res
      .status(200)
      .send({ message: "admin created successfully", admin: admin });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
app.post("/signin", async (req, res) => {
  try {
    let { username, password } = req.body;
    let isAdmin = await adminModel.findOne({ username });
    if (!isAdmin) {
      return res.status(401).send({ message: "invalid username!" });
    } else if (isAdmin.password !== password) {
      return res.status(401).send({ message: "invlaid password!" });
    } else {
      return res
        .status(200)
        .send({ message: "login successfull.", admin: isAdmin.username });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = app;
