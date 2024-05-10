//IIMPORT FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const app = express();

Db = "mongodb+srv://macaulayfamous:beejaymac@cluster0.kkep68t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//import from other file

const authRouter = require("./routes/auth");
const { auth } = require('./middleware/auth');
const categoryRouter = require('./routes/category');
const bannerRouter = require('./routes/banner');
const productRouter =require('./routes/product');
const subCategoryRouter = require('./routes/subcategory');
const orderRouter = require("./routes/user");



app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);
app.use(bannerRouter);
app.use(productRouter);
app.use(subCategoryRouter)
app.use(orderRouter);


mongoose.connect(Db).then(()=>{
  console.log('connected');
})

app.listen(5000,"0.0.0.0", () => {
  console.log('App listening on port 6000!');
});


