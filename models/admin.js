const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminModel = model('admin', adminSchema);

module.exports = adminModel;