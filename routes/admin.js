const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const adminModel = require('../models/admin');
const auth = require('../auth/auth');

// router.get('/adminTestToken', (req, res) => {
//     const admin = auth(req,'admin');
//     if (admin) {
//         res.send("You are authorized to access this route.");
//     } else {
//         res.send("You are not authorized to access this route.");
//     }
// });

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
                token:token
            });
        }
        else{   
            res.send('Invalid Username or Password');
        }
    })
});

module.exports = router;