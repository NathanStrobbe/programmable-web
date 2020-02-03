const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    writer: {
        type: String,
        required: true,
        ref: 'user'
    },
    content:  {
        type: String,
        required: true,
    },
    date: {
        date: Date,
        required: true,
    },
    pluginId: {
        pluginId: String,
        required: true,
        ref: 'plugin'
    }
});

const Comment = module.exports = mongoose.model('comment', commentSchema);

module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
};
