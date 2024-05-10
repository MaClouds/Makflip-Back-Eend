const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Order", orderSchema);
