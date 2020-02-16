const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit);
};
