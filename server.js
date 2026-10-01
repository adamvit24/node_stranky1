// nacteni nastaveni ze souboru .env
require('dotenv').config();

const port = process.env.PORT;

// spusteni serveru
require('http').createServer(require('./app'))
.listen(port, () => {
	console.log(`Server běží na http://localhost:${port}`);
});