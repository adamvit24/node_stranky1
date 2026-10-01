// nacteni balicku s knihovnou express
import express from 'express'
//vytvoreni backendove aplikace
const app = express();
//nastaveni
const port = 3000;

//volba
app.set('view engine', 'ejs');

app.set('views', './views');

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


// spusteni serveru aplikace
app.listen(port, () => {
  console.log(`Server běží na portu ${port}...`);
})