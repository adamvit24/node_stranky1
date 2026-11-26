const controller = require('../controllers/ticketsController.js');
const router = require('express').Router();

router.get('/', controller.showTickets);
router.post('/add', controller.addToCart);
router.post('/remove/:id', controller.removeFromCart);

module.exports = router;