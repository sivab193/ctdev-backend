const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const chatSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true});

const complaintSchema = new Schema({
    cid: {
        type: Number,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    chatHistory: [chatSchema]
}, {timestamps: true});

const complaintModel = model('complaint', complaintSchema);
module.exports = complaintModel;
