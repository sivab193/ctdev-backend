const express = require('express');
const bodyParser = require('body-parser');

const complaintRouter = express.Router();
complaintRouter.use(bodyParser.json());

complaintRouter.post('/raiseComplaint',(req,res)=>{
    if(!req.body || !req.body.faq)
        res.send({ success: false });

    const complaint =  new complaintModel({
        cid: Math.floor(Math.random() * 1001),
        complaint: res.send(req.body.complaint),
        password: res.send(req.body.password),
        resolved: false,
        category: res.send(req.body.category)
    })
    user.save()
    .then((complaints)=>res.send(
        { success: true,
          message: "Successfully raised complaint",
          cid: complaints.cid }))
    .catch((err) => {
            console.log(err);
            res.send({ success: false });
        })
})

module.exports = complaintRouter;
