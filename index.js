//import the express module
const express = require('express');
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subcategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');
const vendorRouter = require('./routes/vendor');
const orderRouter = require('./routes/order');
const stripeRouter = require('./routes/stripe_payment_gateway');
const cors = require('cors'); 
//Defind the port number the server will listen on
const PORT = process.env.PORT || 3000;

//create an instance of an express application
//because it give us the starting point

const app = express();
//mongodb connection  String
const DB  = "mongodb+srv://Makflip:Makflip1@cluster0.y7lzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use(express.json());
app.use(cors());///enable cors for all routes and origin
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);
app.use(vendorRouter);
app.use(orderRouter);
app.use(stripeRouter);
mongoose.connect(DB).then(()=>{
 console.log('mongodb connected');
});

//start the server and listen on the specified port 
app.listen(PORT,"0.0.0.0", function(){
    //LOG THE NUMBER 
    console.log(`server is running on port ${PORT}`);
} );