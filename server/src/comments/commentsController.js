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
    const pluginId = req.body.pluginId;
    const content = req.body.content;
    const date = req.body.date;
    const myobj = { writer: user, content: content, date: date, pluginId: pluginId };

    Comment.collection.insertOne(myobj, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        return Comment.find({pluginId: pluginId}, (err, comments) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(201).send(comments);
        });
    });
};
