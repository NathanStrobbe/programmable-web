const Plugin = require('./pluginModel');
const Image = require('./imageModel');
const User = require('../users/userModel');
const Category = require('./categoryModel');


exports.getAll = function (req, res) {
    Plugin
        .find({})
        .populate('image')
        .exec((err, plugins) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(plugins);
        });
};

exports.get = function (req, res) {
    console.log(req.query);
    Plugin
        .findOne({ '_id': req.query.id })
        .populate('image')
        .exec((err, plugin) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(plugin);
        });
};

exports.addplugins = function (req, res) {
    const image = req.files.image[0];
    const plugin = new Plugin();
    plugin.name = req.body.name;
    plugin.version = req.body.version;

    plugin.description = req.body.description;
    plugin.version = req.body.version;
    plugin.likes = req.body.likes;
    plugin.creator = req.body.creator;
    plugin.tags = req.body.tags;
    plugin.video = req.body.video;
    plugin.linkgithub = req.body.linkgithub;
    plugin.openSource = req.body.openSource;
    plugin.creator = '';

    Plugin.findOne({ name: plugin.name }, (err, pluginFound) => {
        if (err) {
            return res.status(401).send(err);
        }

        if (pluginFound) {
            return res.status(409).send('Plugin name already in database');
        }

        console.log('findOne');
        /* TODO change it */
        return User.findOne({}, (err, user) => {
            if (err) {
                return console.error(err);
            }
            plugin.creator = user._id;

            const imageModel = new Image();
            imageModel.name = image.originalname;
            imageModel.mimeType = image.mimetype;
            imageModel.buffer = image.buffer;

            imageModel.save((err, img) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(500);
                }
                console.log('Image added');
                plugin.image = img._id;

                return Category.findOne({name: req.body.category}, (err, category)=>{

                        console.log("HELLO");
                    if(err){
                       console.log(err);
                    }

                    if(category == null){
                        const category = new Category();
                        category.name = req.body.category;
                        category.save((err, cat)=>{
                            if(err){
                                console.log(err);
                                return res.status(500).send("Category add failed");
                            }

                            plugin.category = cat._id;
                        })
                    }
                    else{
                        plugin.category = category._id;
                        return plugin.save((err) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                            return res.status(201).send({ message: 'Plugin added', data: plugin });
                        });
                    }
                })


            });
        });
    });
};

exports.addLike = function (req, res) {
    const users = req.body.users;
    const plugin = req.body.name;
    const target = { name: plugin };
    const newValue = { $set: { likes: users } };

    Plugin.collection.updateOne(target, newValue, function (err, yolo) {
        if (err)
            res.status(500).send(err);
        res.status(200).send({ msg: 'Plugins updated', data: plugin });
    });
};
