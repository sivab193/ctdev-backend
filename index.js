const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRouter = require('./routes/admin');
const complaintRouter = require('./routes/complaint');
const faqRouter = require('./routes/faq');

const db = process.env.DB_URI;

const app =  express();
mongoose.connect(db).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());

app.use('/',adminRouter);
app.use('/',complaintRouter);
app.use('/',faqRouter);

app.listen(3000,()=>{
    console.log("Server is running!");
})
