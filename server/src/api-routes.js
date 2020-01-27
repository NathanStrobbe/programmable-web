let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to REST'
    });
});

var pluginController = require('./plugin/pluginController');


router.route('/plugin')
	.post(pluginController.addplugins)
	.get(pluginController.getAll);


module.exports = router;