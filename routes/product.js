const express = require('express');
const { auth } = require('../middleware/auth');
const {Product} = require('../models/product_model');
const productRouter = express.Router();

productRouter.post('/post/add-product',async (req, res) => {

    try {
    const {productName, productPrice, discount,quantity,description,category, images } = req.body;
    const product = new Product({productName, productPrice, discount,quantity,description,category, images,  });
    
    await product.save();
    res.status(201).send(product);
    } catch (error) {
        res.status(400).json({ error: error.message });

    }

});

//get products

productRouter.get('/api/products', async (req, res) => {
  try {
    // Find products where popular is true and sort by default creation order
    const products = await Product.find({ popular: true }).sort({ _id: -1 });
    res.status(200).json(products); // Send the products as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response
  }
});

  //get product by category

productRouter.get('/category/products', async (req, res) => {
    try {
        // Check if category query parameter is provided
        const category = req.query.category;
        let products;
        if (category) {
            // Find products where category matches the query parameter
            products = await Product.find({ category: category });
        } else {
            // If no category provided, return all products
            products = await Product.find();
        }
        res.status(200).json(products); // Send the products as JSON response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error response
    }
});


// / Add a new route to get recommended products
productRouter.get('/api/recommended-products', async (req, res) => {
  try {
    // Find recommended products and sort by default creation order
    const recommendedProducts = await Product.find({ recommed: true }).sort({ _id: -1 });
    res.status(200).json(recommendedProducts); // Send the recommended products as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response
  }
});
module.exports = productRouter;

