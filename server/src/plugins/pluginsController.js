Plugin = require('./pluginModel');


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
    const plugin = req.body;

    Plugin.collection.insertOne(plugin, function (err, plugin) {
        if (err)
            res.status(500).send(err);
        res.status(200).send({ msg: 'Plugins added', data: plugin });
    });
};
