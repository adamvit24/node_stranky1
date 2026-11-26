const jsondb = require('simple-json-db');
const path = require('path');

const db = new jsondb(path.join(__dirname, '../../data/tickets.json'));

// cenik vstupenek
const CENIK = {
	'1den': { nazev: 'Jednodenní vstupenka (1 den)', cena: 499 },
	'3dny': { nazev: 'Třídenní vstupenka (3 dny)', cena: 1299 },
	'vip': { nazev: 'VIP vstupenka', cena: 2499 }
};

exports.ziskatCenik = () => {
	return CENIK;
};

// nacteni polozek v kosiku konkretniho uzivatele
exports.nacistKosikUzivatele = (uzivatel) => {
	const data = db.JSON();
	const vsechny = Array.isArray(data) ? data : (data.kosik || []);
	return vsechny.filter(v => v.uzivatel === uzivatel).reverse();
};

// pridani vstupenky do kosiku
exports.pridatDoKosiku = (uzivatel, typ, pocet) => {
	const polozka = CENIK[typ];
	const mnozstvi = parseInt(pocet);

	if (!polozka || isNaN(mnozstvi) || mnozstvi < 1) {
		return false;
	}

	const data = db.JSON();
	const vsechny = Array.isArray(data) ? data : (data.kosik || []);
	const noveId = vsechny.length > 0 ? Math.max(...vsechny.map(v => v.id)) + 1 : 1;

	const novaPolozka = {
		id: noveId,
		uzivatel: uzivatel,
		typ: polozka.nazev,
		pocet: mnozstvi,
		celkovaCena: polozka.cena * mnozstvi
	};

	vsechny.push(novaPolozka);
	db.set('kosik', vsechny);
	return novaPolozka;
};

// odebrani jedne polozky z kosiku
exports.odebratZKosiku = (uzivatel, id) => {
	const data = db.JSON();
	let vsechny = Array.isArray(data) ? data : (data.kosik || []);
	
	vsechny = vsechny.filter(v => !(v.id == id && v.uzivatel === uzivatel));
	db.set('kosik', vsechny);
};

// smazani celeho kosiku uzivatele (pri zruseni uctu)
exports.smazatKosikUzivatele = (uzivatel) => {
	const data = db.JSON();
	let vsechny = Array.isArray(data) ? data : (data.kosik || []);
	vsechny = vsechny.filter(v => v.uzivatel !== uzivatel);
	db.set('kosik', vsechny);
};