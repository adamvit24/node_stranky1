const model = require('../models/postsModel.js');

// zobrazeni konkretniho prispevku
exports.showPost = (req, res) => {
	const id = req.params.id;
	const prispevek = model.nacistPrispevek(id);

	res.render('post', {
		titulek: 'Příspěvek',
		prispevek: prispevek,
	});
};

// zobrazeni vsech prispevku
exports.allPosts = (req, res) => {
	res.render('posts', {
		titulek: 'TrutnoFest 2026 - Novinky a příspěvky',
		prispevky: model.nacistPrispevky(),
	});
};

// vkladani noveho prispevku (Krok 2 ze zadani)
exports.createPost = (req, res) => {
	const { nadpis, obsah } = req.body;
	if (nadpis && obsah) {
		model.pridatPrispevek(nadpis, obsah);
	}
	res.redirect('/posts');
};

// mazani prispevku (Krok 3 ze zadani)
exports.deletePost = (req, res) => {
	const id = req.params.id;
	model.smazatPrispevek(id);
	res.redirect('/posts');
};