const model = require('../models/postsModel.js');

// zobrazeni konkretniho prispevku
exports.showPost = (req, res) => {
	const id = req.params.id;
	const prispevek = model.nacistPrispevek(id);

	res.render('post', {
		titulek: prispevek ? prispevek.nadpis + ' - TrutnoFest 2026' : 'Příspěvek nenalezen - TrutnoFest 2026',
		prispevek: prispevek,
	});
};

// zobrazeni vsech prispevku
exports.allPosts = (req, res) => {
	res.render('posts', {
		titulek: 'TrutnoFest 2026 - Novinky a příspěvky',
		prispevky: model.nacistPrispevky(),
		prihlasenyUzivatel: req.session.prihlasenyUzivatel || null,
	});
};

// vkladani noveho prispevku (jen pro prihlasene)
exports.createPost = (req, res) => {
	const autor = req.session.prihlasenyUzivatel;
	if (!autor) {
		return res.redirect('/users');
	}

	const { nadpis, obsah } = req.body;
	if (nadpis && obsah) {
		model.pridatPrispevek(nadpis, obsah, autor);
	}
	res.redirect('/posts');
};

// mazani prispevku (jen vlastni prispevek prihlaseneho autora)
exports.deletePost = (req, res) => {
	const autor = req.session.prihlasenyUzivatel;
	const id = req.params.id;
	const prispevek = model.nacistPrispevek(id);

	if (autor && prispevek && prispevek.autor === autor) {
		model.smazatPrispevek(id);
	}
	res.redirect('/posts');
};