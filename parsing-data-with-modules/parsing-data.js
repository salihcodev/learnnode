const http = require('http');
const routingHandler = require('./routes-as-a-module');

// host name:
const hostName = 9000;

// created server:
const server = http.createServer(routingHandler);

// listening...
server.listen(hostName);
