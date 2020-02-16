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
        type: Date,
        required: true,
    },
    pluginId: {
        type: String,
        required: true,
        ref: 'plugin'
    }
});

const Comment = module.exports = mongoose.model('comment', commentSchema);

module.exports.get = (callback, limit) => {
    Comment.find(callback).limit(limit);
};
