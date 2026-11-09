// nacteni balicku s knihovnou express a path
const express = require('express');
const path = require('path');

// vytvoreni backendove aplikace
const app = express();

// volba view enginu
app.set('view engine', 'ejs');

// nastaveni cesty ke slozce views (lezi přímo v app/)
app.set('views', path.join(__dirname, 'views'));

// staticke soubory (slozka public lezi o uroven vys v src/)
app.use(express.static(path.join(__dirname, '../public')));

app.use(require('./routes/defaultRouter'));

module.exports = app;