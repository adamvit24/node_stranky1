const controller = require('../controllers/defaultController.js');
const router = require('express').Router();

// presmerovani na specializovany router pro /posts
router.use('/posts', require('./postsRouter.js'));

// indexova stranka
router.get(['/', '/index'], controller.index);

// chybova stranka
router.use(controller.error);

module.exports = router;