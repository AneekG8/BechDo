import express from "express";
import cors from 'cors';
import env from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";


//routes
import authRoutes from './routes/apis/authRoutes.js'; 
import productRoutes from './routes/apis/productRoutes.js';
import adminRoutes from './routes/apis/adminRoutes.js';
import messageRoutes from './routes/apis/messageRoutes.js';

const app = express();

env.config();

const PORT = process.env.PORT;

//DB properties
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v2eze.mongodb.net/BechDo?retryWrites=true&w=majority`;
const dbOptions = {useUnifiedTopology: true,useNewUrlParser: true};

//DB connection
mongoose.connect(dbURI,dbOptions)
    .then(res => {
        app.listen(PORT,()=>{
            
            console.log('server has started....');
        })
    })
    .catch(e=>{
        console.log(e)
    })


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//config routes
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/messages',messageRoutes);
