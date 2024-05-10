const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order_model");

// Import your authentication middleware
const { auth } = require("../middleware/auth");

// POST route for creating orders
orderRouter.post("/api/orders", auth, async (req, res) => {
  try {
    const {
      name,
      productName,
      productPrice,
      discount,
      quantity,
      category,
      image,
    } = req.body;

    // Access the authenticated user ID from req.user
    const userId = req.user;

    const createdAt = new Date().getMilliseconds(); // Get the current date and time

    // Create a new order with buyerId and vendorId set to the same userId
    const order = new Order({
      name,
      productName,
      productPrice,
      discount,
      quantity,
      category,
      image,
      buyerId: userId,
      vendorId: userId,
      createdAt,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

orderRouter.get("/api/orders", auth, async (req, res) => {
  try {
    const userId = req.user;

    // Find orders by buyerId
    const orders = await Order.find({ buyerId: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = orderRouter;
