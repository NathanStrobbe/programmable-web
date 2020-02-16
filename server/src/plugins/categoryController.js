const Category = require('./categoryModel');

exports.all = (req, res) => {

    Category.get((err, categories) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        return res.status(200).send(categories);
    });
};


exports.add = (req, res) => {
    console.log(req.body);
    const cat = new Category();
    cat.name = req.body.name;

    Category.findOne({ name: req.body.name }, (err, categoryFound) => {
        if (err) {
            console.error(err);
            return res.status(401).send(err);
        }

        if (categoryFound) {
            return res.status(409).send('Categorie already in database');
        }

        return cat.save((err, category) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(category);
        });
    });
};
