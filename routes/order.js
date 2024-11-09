const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order');  // Import the order schema
const {auth}= require('../middleware/auth');
// POST route to create a new order
orderRouter.post('/api/orders', auth, async (req, res) => {
    try {
        const order = new Order({
            fullName: req.body.fullName,
            email: req.body.email,
            state: req.body.state,
            city: req.body.city,
            locality: req.body.locality,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            quantity: req.body.quantity,
            category: req.body.category,
            image: req.body.image,
            buyerId: req.body.buyerId,
            vendorId: req.body.vendorId,
            createdAt: Date.now(),
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch all orders
orderRouter.get('/api/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch a specific order by ID
orderRouter.get('/api/orders/:id',auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// DELETE route to delete an order by ID
orderRouter.delete('/api/orders/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (deletedOrder) {
            res.status(200).json({ message: 'Order deleted' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = orderRouter;
