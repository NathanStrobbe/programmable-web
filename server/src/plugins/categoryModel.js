const mongoose = require('mongoose');

const caterorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Category = module.exports = mongoose.model('category', caterorySchema);

module.exports.get = (callback, limit) => {
    Category.find(callback).limit(limit);
};
