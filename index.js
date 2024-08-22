const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS package
const app = express();

// const Db = "mongodb+srv://macaulayfamous:beejaymac@cluster0.1sqrhdg.mongodb.net/";
Db = "mongodb+srv://Makflip:Makflip123@cluster0.jm0pctz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Db = "mongodb+srv://macaulayfamous:beejaymac@cluster0.kkep68t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import routes
const authRouter = require("./routes/auth");
const { auth } = require('./middleware/auth');
const categoryRouter = require('./routes/category');
const bannerRouter = require('./routes/banner');
const productRouter = require('./routes/product');
const subCategoryRouter = require('./routes/subcategory');
const orderRouter = require("./routes/user");
const courseRouter = require('./routes/course');
const sellerRouter = require('./routes/seller')

// Use CORS middleware
app.use(cors()); // This allows all origins. You can configure it further if needed.

app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);
app.use(bannerRouter);
app.use(productRouter);
app.use(subCategoryRouter);
app.use(orderRouter);
app.use(courseRouter)
app.use(sellerRouter)
const PORT = process.env.PORT || 5000;

mongoose.connect(Db).then(() => {
  console.log('connected');
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
