// nacteni nastaveni ze souboru .env
require('dotenv').config();

const port = process.env.PORT;

require('http').createServer(require('./app'))
.listen(port, () => {
	console.log('Server běží na portu ${port} ...');
});