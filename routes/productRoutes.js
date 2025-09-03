const express = require("express");
const Product = require("../models/product");
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const router = express.Router();


// Create Product
router.post("/", auth, upload.single("image"), async (req, res) => {
const { name, description, price } = req.body;
const product = new Product({
name,
description,
price,
image: req.file ? req.file.path : null,
});
await product.save();
res.json(product);
});


// Get All Products
router.get("/", async (req, res) => {
const products = await Product.find();
res.json(products);
});


// Update Product
router.put("/:id", auth, async (req, res) => {
const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(product);
});


// Delete Product
router.delete("/:id", auth, async (req, res) => {
await Product.findByIdAndDelete(req.params.id);
res.json({ message: "Product deleted" });
});


module.exports = router;