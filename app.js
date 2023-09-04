const express= require('express');
const app =express();
const productroot = require('./route/product')
const connection=require('./databaseconnection/connection')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204, 
};




app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions)); 
app.use(express.json());
app.use('/product',productroot);





module.exports=app
