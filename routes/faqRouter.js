const express = require('express');
const bodyParser = require('body-parser');

var Faq = require('../models/faqs');

var faqRouter = express.Router();
faqRouter.use(bodyParser.json());

faqRouter.get('/viewFaq/:faqId', (req, res) => {
    Faq.findById(req.params.faqId)
    .then((faq) => {
        res.send({ success: true,
                   faqs: faq });
    })
    .catch((err) => {
        console.log(err);
        res.send({ success: false });
    })
})

faqRouter.post('/postFaq', (req, res) => {
    if(!req.body || !req.body.faq)
        res.send({ success: false });

    Faq.create(req.body.faq)
    .then((faq) => {
        res.send({ success: true,
                   msg: "Successfully posted faq" });
    })
    .catch((err) => {
        console.log(err);
        res.send({ success: false });
    })
})

module.exports = faqRouter;