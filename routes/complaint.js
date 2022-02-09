const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {complaintModel, complaintChatModel} = require('../models/complaints');

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
    });
});

//TODO: auth should be added
router.post('/sendMessage', (req, res)=>{
    const body = req.body;

    //TODO: mocking user id
    user = "1";

    if(body.cid === null || body.cid === undefined){
        res.send({
            success: false,
            msg: 'cid is missing'
        });
    }else if(body.message === null || body.message === undefined){
        res.send({
            success: false,
            msg: 'message is missing'
        });
    }else{
        complaintModel.findOne({cid: body.cid}, (err, complaint)=> {
            if(!err) {
                if(!complaint) {
                    console.log("No such complaint exist");
                    res.send({ success:false });
                }else{
                    currentChat = new complaintChatModel({
                        user: user,
                        message: body.message,
                        timestamp: {}
                    });
                    complaint.chatHistory.push(currentChat);
                }
                complaint.save(function(err) {
                    if(!err) {
                        res.send({ success:true });
                    }
                    else {
                        console.log("Error at updating complaint: " + complaint);
                        res.send({ success:false });
                    }
                });
            }else{
                console.log("Error at updating complaint: " + complaint);
                res.send({ success:false });
            }
        });
    }
});

module.exports = router;