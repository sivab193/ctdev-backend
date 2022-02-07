const express = require('express');
const router = express.Router();
const faqModel = require('../models/faqs');

router.get('/', (req, res) => {
    res.send('Hello Admin');
});

//Auth should be added
router.post('/updateFaq',(req,res)=>{
    const body = req.body;
    if(body.faq ===null ||body.faq._id === null || body.faq._id === undefined){
        res.send({
            success:false,
            msg:'faq_id is missing'
        });
    }else{
        faqModel.findOne({_id: body.faq._id}, (err, faq)=> {
            if(!err) {
                if(!faq) {
                    faq = new faqModel({
                        answer: body.faq.answer,
                        question: body.faq.question
                    });
                    
                }else{
                    faq.answer = body.faq.answer;
                    faq.question = body.faq.question;
                }
                faq.save(function(err) {
                    if(!err) {
                        res.send({success:true});
                    }
                    else {
                        console.log("Error at updating" + faq);
                        res.send({success:false});
                    }
                });
            }else{
                console.log("Error at updating" + faq);
                res.send({success:false});
            }
        });
    }
});

//auth should be added
router.post('/deleteFaq',async (req,res)=>{
    const body = req.body;
    if(body._id === null || body._id === undefined){
        res.send({
            success:false,
            msg:'faq_id is missing'
        });
    }else{
        await faqModel.deleteOne({_id:body._id});
        res.send({
            success:true
        })
    }
});
// app.get('/admin',(req,res)=>{
//     const admin = new adminModel({
//         username: 'admin',
//         password: 'admin'
//     });
//     admin.save().then(()=>{
//         res.send('Admin Created');
//     }).catch(()=>{
//         res.send('Admin already exists');
//     })
// });

// app.get('/allAdmin',(req,res)=>{
//     adminModel.find().then(admins=>{
//         res.send(admins);
//     }).catch(()=>{
//         res.send('No admins found');
//     })
// });

module.exports = router;