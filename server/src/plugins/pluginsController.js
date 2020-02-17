const Plugin = require('./pluginModel');
const Image = require('./imageModel');
const User = require('../users/userModel');
const Category = require('./categoryModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const unzipper = require('unzipper');

exports.getAll = (req, res) => {
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

exports.getOfficiel = (req, res) => {
    Plugin
        .find({validated: true})
        .populate('image')
        .exec((err, plugins) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(plugins);
        });
};

exports.validate = (req, res) => {
    console.log(req.body.validate);
    if(req.body.validate){
        Plugin
            .findOne({'name': req.body.name}, (err, plugin)=>{
                plugin.validated = true;
                plugin.save((err, newPlugin)=>{
                    if(err)
                        return res.status(500).send(err);
                    console.log(newPlugin);
                    return res.status(200).send(newPlugin);
                });
            });
    }else{
        return res.status(500).send("Plugin not validated");
    }
}

exports.download = (req, res,next) => {
  console.log(req.query);
  let path = '';
  Plugin
      .findOne({ '_id': req.query.id })
      .exec((err, plugin) => {
          if (err) {
              console.error(err);
              return res.status(500).send(err);
          }
          path = '../' + plugin.sourcePath;
          if(path !== '/'){
            res.download(path, function (err) {
              console.log(err);
            });
          }else{
            next();
            return res.status(200).send(plugin);
          }
      });
};

exports.get = (req, res) => {
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

exports.addplugins = (req, res) => {
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
                console.error(err);
                return res.status(500).send(err);
            }
            plugin.creator = user._id;

            const image = new Image();
            image.name = imageFile.originalname;
            image.mimeType = imageFile.mimetype;
            image.buffer = imageFile.buffer;

            return image.save((err, img) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
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
                            return res.status(404).send(err);
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

exports.addLike = (req, res) => {
    const users = req.body.users;
    const plugin = req.body.name;
    const target = { name: plugin };
    const newValue = { $set: { likes: users } };

    Plugin.collection.updateOne(target, newValue, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.status(200).send({ msg: 'Plugins updated', data: plugin });
    });
};
