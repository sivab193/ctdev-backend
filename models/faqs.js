const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true })

const faq = model('faq', faqSchema);
module.exports = faq;