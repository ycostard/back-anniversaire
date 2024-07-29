const express = require('express');
const cors = require('cors');
require('./api/db/db.js');

const hostname = '0.0.0.0';
const port = 3002;

const server = express();


server.use(cors());

server.use(express.urlencoded());
server.use(express.json());

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

const csvRoute = require('./api/routes/CSVRoute.js');
csvRoute(server);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
