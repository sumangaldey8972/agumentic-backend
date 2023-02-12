const express = require("express");
const headlineModel = require("../models/headline.model");
const homeModel = require("../models/home.models");
const productModel = require("../models/products.model");

const app = express.Router();

app.get("/mainbanner", async (req, res) => {
  try {
    let image = await homeModel.find();

    return res.status(200).send({ newImage: image });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/mainbanner", async (req, res) => {
  try {
    let isImage = await homeModel.find();
    console.log(isImage);
    if (isImage.length == 1) {
      return res.status(401).send({
        message: "can not add more image, only image update is allowed",
      });
    } else {
      let newImage = await homeModel.create(req.body);
      return res
        .status(200)
        .send({ message: "new image inserted", newImage: newImage });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/updatemainbanner/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { imageurl } = req.body;
    let updateImage = await homeModel.findOneAndUpdate(
      { _id: id },
      { imageurl: imageurl },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "image update successfull", newImage: updateImage });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/supportheadline", async (req, res) => {
  try {
    let text = await headlineModel.find();
    return res.status(200).send({ text: text });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/supportheadline", async (req, res) => {
  try {
    let isText = await headlineModel.find();
    if (isText.length == 1) {
      return res.status(401).send({
        message: "can not perform this operation, only updation is allowed",
      });
    }
    let newText = await headlineModel.create(req.body);
    let text = newText.text.split(" ");
    if (text.length > 12) {
      return res
        .status(401)
        .send({ message: "kindly add 9 to 12 words for this sections" });
    } else {
      return res
        .status(200)
        .send({ message: "new sentence inserted", newText: newText });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/supportheadline/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { text } = req.body;
    let updateText = await headlineModel.findOneAndUpdate(
      { _id: id },
      { text: text },
      { new: true }
    );
    return res.status(200).send({
      message: "student headline update successfull",
      text: updateText,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).send({ products: products });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    let product = await productModel.create(req.body);
    return res
      .status(200)
      .send({ message: "new product added", product: product });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { icon, title, headline, description, productimage } = req.body;
    let updateProduct = await productModel.findOneAndUpdate(
      { _id: id },
      {
        icon: icon,
        title: title,
        headline: headline,
        description: description,
        productimage: productimage,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "product updated successfull", product: updateProduct });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let product = await productModel.findById({ _id: id });
    if (product == null) {
      return res.status(401).send({ message: "invalid product" });
    } else {
      await product.deleteOne();
      return res.status(200).send({ message: "Product Deleted" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = app;
