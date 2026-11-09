// zavislosti
const model = require('../models/postsModel.js');

// priprava routeru
const router = require('express').Router();

router.get('/hello', (req, res) => {
	res.send('Hello World from Express!');
});

router.get(['/','/index'], (req, res) => {
	res.render('index');
});

router.get('/posts', (req, res) => {
	res.render('posts', {
		titulek: 'Příspěvky',
		prispevky: model.nacistPrispevky(),
	});
});

// vsechny ostatni URL jsou chyba
router.use((req, res) => {
	res.render('error');
});

// exportovani routeru pro pouziti v aplikaci
module.exports = router;