var mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
    email: {
    	type : String,
    	required: true, 
    	ref: 'user' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now}
});

var Token = module.exports = mongoose.model('token', tokenSchema);

module.exports.get = function(callback, limit){
	Token.find(callback).limit(limit);
}
