// nacteni balicku s knihovnou express
const express = require('express');
//vytvoreni backendove aplikace
const app = express();

//volba
app.set('view engine', 'ejs');

app.set('views', './app/views');

//staticke soubory
app.use(express.static('public'));

app.use(require('./routes/defaultRouter'));

module.exports = app;