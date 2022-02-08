const express = require('express');
const router = express.Router();
const {complaintModel, complaintChatModel} = require('../models/complaints');

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