const http = require('http');

/*
req - IncomingMessage (class) - Readable Stream
res - ServerResponse (class) - Writable Stream
*/

const server = http.createServer((req, res) => {
	console.log('a new connection is established');
	res.write('<h1>Welcome to node.js</h1>');
	res.end();
});

server.listen(8080);

server.on('listening', () => console.log('server listening on 8080!'));