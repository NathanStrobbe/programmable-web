const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caterorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Category = module.exports = mongoose.model('category', caterorySchema);

module.exports.get = function (callback, limit) {
    Category.find(callback).limit(limit);
};

