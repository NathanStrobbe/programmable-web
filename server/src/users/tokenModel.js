const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref: 'user'
    },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

const Token = module.exports = mongoose.model('token', tokenSchema);

module.exports.get = (callback, limit) => {
    Token.find(callback).limit(limit);
};
