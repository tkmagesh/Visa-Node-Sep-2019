const http = require('http');
const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler');


const _middlewares = [ dataParser, serveStatic, serveCalculator, notFoundHandler ];

function exec(req, res, middlewares){
	const [first, ...remaining] = middlewares,
		next = function(){
			exec(req, res, remaining);
		};
	if (typeof first === 'function')
		first(req, res, next);
}
const server = http.createServer((req, res) => {
	/*dataParser(req);
	console.log(`${req.method}\t${req.parsedUrl.pathname}`);
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);
	*/
	exec(req, res, _middlewares);
});
server.listen(8080);
server.on('listening', () => console.log('server listening on 8080!'));