const express = require('express');
const app =  express();
const bodyParser =  require('body-parser');

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello NodeJS")
})

app.listen(3000,()=>{
    console.log("Server is running!");
})
