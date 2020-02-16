const Plugin = require('./pluginModel');
const Image = require('./imageModel');
const User = require('../users/userModel');
const Category = require('./categoryModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const unzipper = require('unzipper');

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
        .populate('creator')
        .exec((err, plugin) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(plugin);
        });
};

exports.addplugins = function (req, res) {
    const imageFile = req.files.image[0];
    const pluginFile = req.files.plugin[0];

    const plugin = new Plugin();
    plugin.name = req.body.name;
    plugin.version = req.body.version;
    plugin.description = req.body.description;
    plugin.version = req.body.version;
    plugin.likes = req.body.likes;
    plugin.creator = req.body.creator;
    plugin.tags = req.body.tags.split(',');
    plugin.video = req.body.video;
    plugin.linkgithub = req.body.linkgithub;
    plugin.openSource = req.body.openSource;
    plugin.sourcePath = '';
    plugin.creator = '';

    Plugin.findOne({ name: plugin.name }, (err, pluginFound) => {
        if (err) {
            return res.status(401).send(err);
        }

        if (pluginFound) {
            return res.status(409).send('Plugin name already in database');
        }

        const { email } = jwt.verify(req.body.creator, 'flms');

        return User.findOne({ email: email }, (err, user) => {
            if (err) {
                return console.error(err);
            }
            plugin.creator = user._id;

            const image = new Image();
            image.name = imageFile.originalname;
            image.mimeType = imageFile.mimetype;
            image.buffer = imageFile.buffer;

            return image.save((err, img) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(500);
                }
                console.log('Image added');
                plugin.image = img._id;

                const pluginPath = `plugins/${plugin.name}`;
                if (!fs.existsSync(pluginPath)) {
                    fs.mkdirSync(pluginPath);
                }

                const pluginZipPath = `${pluginPath}/${pluginFile.originalname}`;
                fs.writeFile(pluginZipPath, pluginFile.buffer, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                    console.log('The plugin has been saved!');
                    plugin.sourcePath = pluginPath;

                    fs.createReadStream(pluginZipPath).pipe(unzipper.Extract({ path: pluginPath }));

                    console.log(req.body.category);
                    return Category.findOne({ name: req.body.category }, (err, category) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err);
                        }

                        if (category == null) {
                            console.log('category not found');
                            return res.status(400).send(err);
                        }

                        plugin.category = category._id;
                        return plugin.save((err) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                            return res.status(201).send({ message: 'Plugin added', data: plugin });
                        });
                    });
                });
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
