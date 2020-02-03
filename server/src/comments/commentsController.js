const Comment = require('./commentModel');
const Plugin = require('../plugins/pluginModel');
const User = require('../users/userModel');

exports.get = function (req, res) {
    console.log(req.query);
    Comment.find({ 'pluginId': req.query.pluginId }, function (err, plugin) {
        if (err) {
            res.status(500).send(err);
        }
        if (plugin) {
            console.log(plugin);
            res.status(200).send(plugin);
        }
    });
};

