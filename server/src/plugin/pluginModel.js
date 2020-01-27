var mongoose = require('mongoose');

var pluginSchema = mongoose.Schema({
	name:{
		type: String
	},
});

var Plugin = module.exports = mongoose.model('plugin', pluginSchema);

module.exports.get = function(callback, limit){
	Plugin.find(callback).limit(limit);
}

