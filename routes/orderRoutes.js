const express = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const auth = require("../middleware/authMiddleware");
const router = express.Router();


// Place Order
router.post("/", auth, async (req, res) => {
const { products } = req.body;


const totalAmount = await products.reduce(async (acc, item) => {
const product = await Product.findById(item.product);
return (await acc) + product.price * item.quantity;
}, Promise.resolve(0));


const order = new Order({ user: req.user.id, products, totalAmount });
await order.save();
res.json(order);
});


// Get User Orders
router.get("/my", auth, async (req, res) => {
const orders = await Order.find({ user: req.user.id }).populate("products.product");
res.json(orders);
});


module.exports = router;