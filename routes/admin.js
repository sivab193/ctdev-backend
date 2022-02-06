const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const adminModel = require('../models/admin');

router.get('/', (req, res) => {
    res.send('Hello Admin');
});

router.post('/adminLogin',(req,res)=>{
    const {username,password} = req.body;
    adminModel.findOne({username:username},(err,admin)=>{
        if(err){
            res.send(err);
        }
        if(bcrypt.compareSync(password,admin.password)){
            const token = jwt.sign({
                username:admin.username,
                user_role:"admin"
            },process.env.SECRET_KEY,{
                expiresIn: '1h'
            });
            res.json({
                message:"Login Successful",
                token:token
            });
        }
        else{   
            res.send('Invalid Username or Password');
        }
    })
});

module.exports = router;