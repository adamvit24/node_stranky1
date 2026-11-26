const model = require('../models/ticketsModel');

// zobrazeni stranky se vstupenkami a kosikem (pouze pro prihlasene)
exports.showTickets = (req, res) => {
	const uzivatel = req.session.prihlasenyUzivatel;

	if (!uzivatel) {
		return res.redirect('/users');
	}

	const kosik = model.nacistKosikUzivatele(uzivatel);
	const celkem = kosik.reduce((suma, polozka) => suma + polozka.celkovaCena, 0);

	res.render('tickets', {
		titulek: 'Vstupenky a košík - TrutnoFest 2026',
		prihlasenyUzivatel: uzivatel,
		cenik: model.ziskatCenik(),
		kosik: kosik,
		celkem: celkem,
	});
};

// pridani polozky do kosiku
exports.addToCart = (req, res) => {
	const uzivatel = req.session.prihlasenyUzivatel;

	if (!uzivatel) {
		return res.redirect('/users');
	}

	const { typ, pocet } = req.body;
	model.pridatDoKosiku(uzivatel, typ, pocet);

	res.redirect('/tickets');
};

// odebrani polozky z kosiku
exports.removeFromCart = (req, res) => {
	const uzivatel = req.session.prihlasenyUzivatel;

	if (!uzivatel) {
		return res.redirect('/users');
	}

	const id = req.params.id;
	model.odebratZKosiku(uzivatel, id);

	res.redirect('/tickets');
};