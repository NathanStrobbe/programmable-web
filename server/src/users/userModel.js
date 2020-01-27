var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username:{
		type: String
	},
	password: {
		type: String
	},
	email:{
		type: String
	}
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function(callback, limit){
	User.find(callback).limit(limit);
}

