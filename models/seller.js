const mongoose = require('mongoose');
const { productSchema } = require('./product_model');


const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const result = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return result.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "seller"
    },


    
    
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
