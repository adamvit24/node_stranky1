const controller = require('../controllers/postsController.js');
const router = require('express').Router();

// vkladani a mazani
router.post('/add', controller.createPost);
router.post('/delete/:id', controller.deletePost);

// zobrazeni detailu a seznamu
router.get('/:id', controller.showPost);
router.get('/', controller.allPosts);

module.exports = router;