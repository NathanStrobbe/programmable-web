Plugin = require('./pluginModel');


exports.getAll = function(req, res){
	Plugin.get(function(err, plugins){

		if(err){
			res.status(500).send(err);
		}

		res.status(200).send(plugins);

	});
}

exports.addplugins = function(req, res){
	var plugins = [
		{ name: 'Plugin1'},
		{ name: 'Plugin2'},
	];        

	Plugin.collection.insertMany(plugins, function(err, plugins) {
		if(err)
			res.status(500).send(err);
		res.status(200).send({msg: "Plugins added", data: plugins});
	});
}