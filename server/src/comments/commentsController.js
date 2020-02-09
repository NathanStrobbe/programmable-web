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

exports.add = function (req, res) {
    const user = req.body.writer;
    const plugin = req.body.pluginId;
    const content = req.body.content;
    const date = req.body.date;
    const myobj = { writer: user, content: content, date: date, pluginId: plugin };

    Comment.collection.insertOne(myobj, function(err, comment) {
      if (err) {
          res.status(500).send(err);
      }
      if (comment) {
          console.log(comment);
          res.status(200).send(comment);
      }
  });
};
