const Comment = require('./commentModel');

exports.get = (req, res) => {
    console.log(req.query);
    Comment.find({ 'pluginId': req.query.pluginId }, (err, plugin) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        console.log(plugin);
        return res.status(200).send(plugin);
    });
};

exports.add = (req, res) => {
    const user = req.body.writer;
    const plugin = req.body.pluginId;
    const content = req.body.content;
    const date = req.body.date;
    const myobj = { writer: user, content: content, date: date, pluginId: plugin };

    Comment.collection.insertOne(myobj, (err, comment) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        console.log(comment);
        return res.status(201).send(comment);
    });
};
