const express = require('express');
const bodyParser = require('body-parser');

var Faq = require('../models/faqs');

var faqRouter = express.Router();
faqRouter.use(bodyParser.json());


faqRouter.get('/viewFaq/:faqId', (req, res, next) => {
    Faq.findById(req.params.faqId)
    .then((faq) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'Application/json');
        res.json(faq);
    }, err => next(err))
    .catch((err) => next(err))
})

faqRouter.post('/postFaq', (req, res, next) => {
    Faq.create(req.body.faq)
    .then((faq) => {
        res.statusCode = 200;
        res.send({statusMessage: "Successfully posted faq"});
    }, err => next(err))
    .catch((err) => next(err))
})

module.exports = faqRouter;