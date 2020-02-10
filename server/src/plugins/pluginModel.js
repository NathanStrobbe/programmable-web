const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectId;

const pluginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    likes: {
        type: []
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    image: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'image'
    },
    category: {
        type: String,
        required: true,
        ref: 'category'
    },
    tags: {
        required: true,
        type: []
    },
    video: {
        type: String
    },
    linkgithub: {
        type: String
    },
    openSource: {
        type: Boolean
    }
});

const Plugin = module.exports = mongoose.model('plugin', pluginSchema);

module.exports.get = function (callback, limit) {
    Plugin.find(callback).limit(limit);
};

