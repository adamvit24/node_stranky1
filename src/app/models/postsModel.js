const jsondb = require('simple-json-db');
const path = require('path');

const db = new jsondb(path.join(__dirname, '../../data/posts.json'));

// nacteni vsech prispevku (serazeno od nejvyssiho ID po nejnizsi)
exports.nacistPrispevky = () => {
	const data = db.JSON();
	const prispevky = Array.isArray(data) ? data : (data.prispevky || []);
	
	return [...prispevky].sort((a, b) => b.id - a.id);
};

// nacteni jednoho prispevku
exports.nacistPrispevek = (id) => {
	const prispevky = exports.nacistPrispevky();

	for (let i = 0; i < prispevky.length; i++) {
		if (prispevky[i].id == id) {
			return prispevky[i];
		}
	}

	return false;
};

// pridani prispevku do DB vcetne autora
exports.pridatPrispevek = (nadpis, obsah, autor) => {
	const data = db.JSON();
	const prispevky = Array.isArray(data) ? data : (data.prispevky || []);
	
	const noveId = prispevky.length > 0 ? Math.max(...prispevky.map(p => p.id)) + 1 : 1;
	
	const novyPrispevek = {
		id: noveId,
		nadpis: nadpis,
		obsah: obsah,
		autor: autor
	};

	prispevky.push(novyPrispevek);
	db.set('prispevky', prispevky);
	return novyPrispevek;
};

// smazani jednoho prispevku z DB
exports.smazatPrispevek = (id) => {
	const data = db.JSON();
	let prispevky = Array.isArray(data) ? data : (data.prispevky || []);
	const povodniPocet = prispevky.length;

	prispevky = prispevky.filter(p => p.id != id);

	if (prispevky.length !== povodniPocet) {
		db.set('prispevky', prispevky);
		return true;
	}

	return false;
};

// smazani vsech prispevku daneho autora (pri zruseni uctu)
exports.smazatPrispevkyAutora = (autor) => {
	const data = db.JSON();
	let prispevky = Array.isArray(data) ? data : (data.prispevky || []);
	
	prispevky = prispevky.filter(p => p.autor !== autor);
	db.set('prispevky', prispevky);
};