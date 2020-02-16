const User = require('./userModel');
const Token = require('./tokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user = (req, res) => {
    let email;
    if (req.query.token != null) {
        email = jwt.verify(req.query.token, 'flms').email;
    } else if (req.query.email != null) {
        email = req.query.email;
    } else {
        return res.status(400).send({ err: 'Bad request' });
    }

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.status(200).send(user);
    });
};

exports.getUserByID = (req, res) => {
    User.findOne({ _id: req.query._id }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.status(200).send(user);
    });
};


exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(401).send(err);
        }

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ email: user.email }, 'flms');
                return res.status(200).send({ token: token, user: user });
            }
            return res.status(401).send('Bad password');
        }
        return res.status(401).send('Could not found user');
    });
};

exports.new = (req, res) => {
    console.log(req.body);
    const user = new User();
    user.username = req.body.name;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);

    User.findOne({ email: req.body.email }, (err, userfound) => {
        if (err) {
            console.error(err);
            return res.status(401).send(err);
        }

        if (userfound) {
            return res.status(409).send('Email already in database');
        }

        return user.save(err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            const token = new Token({ email: user.email, token: jwt.sign({ email: user.email }, 'fmls') });

            console.log('User created');
            return token.save(err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                return res.status(200).send({ msg: 'Account created ' + user.email + '.' });
            });
        });
    });
};
