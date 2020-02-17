let router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to REST'
    });
});

const pluginsController = require('./plugins/pluginsController');

router.route('/plugins')
    .post(pluginsController.addplugins)
    .get(pluginsController.getAll);

router.route('/plugins/shop')
    .get(pluginsController.getOfficiel);

router.route('/plugin')
    .post(pluginsController.addLike)
    .get(pluginsController.get);

router.route('/plugin/validate')
    .post(pluginsController.validate);

router.route('/download')
    .get(pluginsController.download);


const usersController = require('./users/usersController');

router.route('/user/delete')
    .get(usersController.delete);

router.route('/user/connect')
    .post(usersController.logIn);

router.route('/user')
    .post(usersController.new)
    .get(usersController.user);

router.route('/user/getUserByID')
    .get(usersController.getUserByID);

const commentsController = require('./comments/commentsController');

router.route('/comments')
    .get(commentsController.get)
    .post(commentsController.add);


const categoriesController = require('./plugins/categoryController');
router.route('/categories')
    .get(categoriesController.all)
    .post(categoriesController.add);

router.route('/categories/delete')
    .get(categoriesController.delete);

module.exports = router;
