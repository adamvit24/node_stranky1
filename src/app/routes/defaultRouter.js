const controller = require('../controllers/defaultController.js');
const router = require('express').Router();

// presmerovani na specializovane routery
router.use('/posts', require('./postsRouter.js'));
router.use('/users', require('./usersRouter.js'));
router.use('/tickets', require('./ticketsRouter.js'));

// indexova stranka
router.get(['/', '/index'], controller.index);

// program stranka
router.get(['/program'], controller.program);

// chybova stranka
router.use(controller.error);

module.exports = router;