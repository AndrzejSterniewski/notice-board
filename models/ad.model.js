const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, minLength: 5, maxLength: 50, required: true },
    text: { type: String, minLength: 10, maxLength: 500, required: true },
    date: { type: Date, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    userInfo: { type: Array, required: true }
});

module.exports = mongoose.model('Ad', adSchema);