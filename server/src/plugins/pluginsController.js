Plugin = require('./pluginModel');
const User = require('../users/userModel');

exports.getAll = function (req, res) {
    Plugin.get(function (err, plugins) {

        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(plugins);

    });
};

exports.get = function (req, res) {
    console.log(req.query);
    Plugin.find({ '_id': req.query.id }, function (err, plugin) {
        if (err) {
            res.status(500).send(err);
        }
        if (plugin) {
            console.log(plugin);
            res.status(200).send(plugin);
        }
    });
};

exports.addplugins = function (req, res) {
    const plugin = new Plugin();
    plugin.name = req.body.name;
    plugin.version = req.body.version;
    plugin.category = req.body.category;
    plugin.description = req.body.description;
    plugin.version = req.body.version;
    plugin.likes = req.body.likes;
    plugin.creator = req.body.creator;
    plugin.image = req.body.image;
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
            const creator = user.email;
            console.log(creator);
            console.log(pluginFound);
            plugin.creator = creator;
            return plugin.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.status(201).send({ message: 'Plugin added', data: plugin});
            });
        });
    });
};

exports.addLike = function (req, res) {
    const users = req.body.users;
    const plugin = req.body.name;
    const target = { name: plugin };
    const newValue = { $set: {likes: users } };

    Plugin.collection.updateOne(target, newValue, function (err, yolo) {
        if (err)
            res.status(500).send(err);
        res.status(200).send({ msg: 'Plugins updated', data: plugin });
    });
};
