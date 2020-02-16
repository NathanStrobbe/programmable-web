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
        // eslint-disable-next-line no-undef
        type: Buffer,
        required: true
    }
});

const Image = module.exports = mongoose.model('image', imageSchema);

module.exports.get = (callback, limit) => {
    Image.find(callback).limit(limit);
};
