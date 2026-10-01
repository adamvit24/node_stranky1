// nacteni balicku s knihovnou express
import express from 'express'
//vytvoreni backendove aplikace
const app = express();

//volba
app.set('view engine', 'ejs');

app.set('views', '.app/views');

//staticke soubory
app.use(express.static('public'));

//custom url mimo staticke stranky
app.get('/hello', (req, res) => {
  res.send('Ahoy zabijáku');
});

app.get(['/', '/index'], (req, res) => {
	res.render('index');
});

app.get(['/program.html', '/program'], (req, res) => {
	res.render('program');
});

module.exports = app;