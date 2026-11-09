// nacteni kodu balicku databaze
const jsondb = require('simple-json-db');
const path = require('path');

// presna cesta k databazi
const db = new jsondb(path.join(__dirname, '../../data/posts.json'));

// nabizena funkcnost modelu
exports.nacistPrispevky = () => {
    const data = db.JSON();
    // Pokud data obsahují pole příspěvků pod klíčem prispevky, nebo přímo pole
    if (Array.isArray(data)) return data;
    return data.prispevky || [];
};