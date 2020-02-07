const Category = require('./categoryModel');

exports.all = function(req, res){
	
	Category.get(function(err, categories){
		if(err)
			res.status(500).send(err);

		res.status(200).send(categories);
	});
}