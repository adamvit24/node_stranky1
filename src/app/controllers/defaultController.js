// indexova stranka
exports.index = (req, res) => {
	res.render('index', {
		titulek: 'Festival - Úvod',
		nazevFestivalu: 'TrutnoFest 2026',
		motto: 'Festival Hudby a Umění',
		datum: new Date().toLocaleDateString(),
	});
};

// chybova stranka
exports.error = (req, res) => {
	res.render('error', {
		titulek: 'Chyba - TrutnoFest 2026',
	});
};