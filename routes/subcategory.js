const express = require('express');
const subCategoryRouter = express.Router();
const SubCategory = require('../models/sub_category_models');
const Category = require('../models/category_models');

subCategoryRouter.post('/api/subcategory', async (req, res) => {
   try {
       const { categoryId, categoryName, image, subcategoryName } = req.body;
       const subcategory = new SubCategory({ categoryId, categoryName, image, subcategoryName });
       await subcategory.save();
       res.status(201).send(subcategory);
   } catch (error) {
       console.error('Error creating subcategory:', error);
       res.status(400).json({ error: error.message });
   }
});

//get categoryName
// subCategoryRouter.get('/api/category/:categoryName', async (req, res) => {
//     try {
//         const categoryName = req.params.categoryName;
//         const category = await Category.findOne({ name: categoryName });
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         console.error('Error fetching category:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



subCategoryRouter.get('/api/category/:categoryName/subcategories', async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        // Assuming you have a relationship between Category and SubCategory models
        // Adjust this query according to your database schema
        const subcategories = await SubCategory.find({ categoryName: categoryName });
        if (!subcategories) {
            return res.status(404).json({ error: 'Subcategories not found' });
        }
        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = subCategoryRouter;
