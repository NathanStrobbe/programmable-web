var mongoose = require('mongoose');

var pluginSchema = mongoose.Schema({
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
        type: String,
        required: true,
        ref: 'user'
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        //ref: 'category'
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

var Plugin = module.exports = mongoose.model('plugin', pluginSchema);

module.exports.get = function (callback, limit) {
    Plugin.find(callback).limit(limit);
};

