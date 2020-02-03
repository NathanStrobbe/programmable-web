User = require('./userModel');
Token = require('./tokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user = function (req, res) {
    var email;
    if (req.query.token != null) {
        var decoded = jwt.verify(req.query.token, 'flms');
        email = decoded.email;
    } else if (req.query.email != null) {
        email = req.query.email;
    } else {
        return res.status(500).send(err);
    }

    User.findOne({ email: ObjectId(email) }, function (err, user) {
        if (err)
            res.status(500).send(err);
        if (user) {
            res.status(200).send(user);
        }
    });
};


exports.logIn = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
            res.status(401).send(err);
        }

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign({ email: user.email }, 'flms');
                res.status(200).send({ token: token, user: user });
            }
            else {
                res.status(401).send('Bad password');
            }
        }
        else {
            res.status(401).send('Could not found user');
        }
    });
};

exports.new = function (req, res) {
    var user = new User();
    user.username = req.body.name;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);


    User.findOne({ email: req.body.email }, function (err, userfound) {
        if (err) {
            res.status(401).send(err);
        }

        if (userfound)
            res.status(409).send('Email already in database');
        else {
            return user.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }

                var token = new Token({ email: user.email, token: jwt.sign({ email: user.email }, 'fmls') });

                console.log('User created');

                return token.save(function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send({ msg: 'Account created ' + user.email + '.' });
                });
            });
        }
    });
};
