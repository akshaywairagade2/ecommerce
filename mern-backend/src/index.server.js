const express =require('express');
const env=require('dotenv');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const cors=require('cors');
//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');

env.config();

//mongodb connection
//mongodb+srv://root:<password>@cluster0.34z42.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    "mongodb+srv://akshay:SPqE_dAx4yP6G6e@cluster0.jwqjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.34z42.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        // useCreateIndex:true
    }
).then(()=>{
    console.log(`Database Connected`);
});

app.use(cors());
app.use(express.json()); 
app.use('/public',express.static(path.join(__dirname,'uploads')));

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
});