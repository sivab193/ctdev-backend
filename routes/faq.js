const express = require('express');
const bodyParser = require('body-parser');

const faqRouter = express.Router();
faqRouter.use(bodyParser.json());

faqRouter.get('/viewFaqs',(req,res)=>
{
    const faq =   view_faqs_model.find()
    .then((faqs) => {
        res.statusCode = 200;
        res.send({ success: true,
                    faqs: faqs });
    })
    .catch((err) => {
        console.log(err);
        res.send({ success: false });
    })
})
module.exports = faqRouter;