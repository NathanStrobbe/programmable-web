const Category = require('./categoryModel');

exports.all = function(req, res){
	
	Category.get(function(err, categories){
		if(err)
			res.status(500).send(err);

		res.status(200).send(categories);
	});
}


exports.add = function (req, res) {
    console.log(req.body);
    var cat = new Category();
    cat.name = req.body.name;

    Category.findOne({ name: req.body.name }, function (err, categoryFound) {
        if (err) {
            res.status(401).send(err);
        }

        if (categoryFound){
            res.status(409).send('Categorie already in database');
        }
        else {
            return cat.save(function (err, category) {
                if (err) {
                    res.status(500).send(err);
                }           
                return res.status(200).send(category);
            });
        }
    });
};
