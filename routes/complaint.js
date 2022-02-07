const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const complaintModel = require('../models/complaints');

// app.get('/complaint',(req,res)=>{
//     const complaint = new complaintModel({
//         cid: 1,
//         complaint: 'Test',
//         password: 'admin',
//         resolved: false,
//         category: 'Test',
//         chatHistory: [{
//             user: 'admin',
//             message: 'Test'
//         }]
//     });
//     complaint.save().then(()=>{
//         res.send("Complaint Added");
//     }).catch(()=>{
//         res.send("Error");
//     });
// });

router.post('/fetchComplaint',(req,res)=>{
    const {cid,password} = req.body;
    complaintModel.findOne({cid:cid},(err,complaint)=>{
        if(err){
            res.send(err);
        }
        if(bcrypt.compareSync(password,complaint.password)){
            const token = jwt.sign({
                cid:complaint.cid,
                user_role:"student"
            },process.env.SECRET_KEY,{
                expiresIn: '1h'
            });
            res.json({
                complaint:complaint,
                token:token
            });
        }
        else{
            res.send('Invalid Complaint Id or Password');
        }
    })
});

module.exports = router;