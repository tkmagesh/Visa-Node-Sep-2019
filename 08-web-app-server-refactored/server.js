const http = require('http');
const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

const server = http.createServer(app);

server.listen(8080);
server.on('listening', () => console.log('server listening on 8080!'));