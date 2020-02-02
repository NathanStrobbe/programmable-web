let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to REST'
    });
});

const pluginsController = require('./plugins/pluginsController');

router.route('/plugins')
    .post(pluginsController.addplugins)
    .get(pluginsController.getAll);

router.route('/plugin')
    .get(pluginsController.get);


const usersController = require('./users/usersController');

router.route('/user/connect')
    .post(usersController.logIn);

router.route('/user')
    .post(usersController.new)
    .get(usersController.user);

module.exports = router;
