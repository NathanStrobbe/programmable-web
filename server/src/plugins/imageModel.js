const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    buffer: {
        type: Buffer,
        required: true
    }
});

const Image = module.exports = mongoose.model('image', imageSchema);

module.exports.get = function (callback, limit) {
    Image.find(callback).limit(limit);
};

