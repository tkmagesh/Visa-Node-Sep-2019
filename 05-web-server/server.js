const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

/*
req - IncomingMessage (class) - Readable Stream
res - ServerResponse (class) - Writable Stream
*/

const server = http.createServer((req, res) => {
	
	const parsedUrl = url.parse(req.url); 
	console.log(`${req.method}\t${parsedUrl.pathname}`);
	const resourceName = parsedUrl.pathname,
		resourceFullName = path.join(__dirname, resourceName);

	if (!fs.existsSync(resourceFullName)){
		res.statusCode = 404;
		res.end();
		return;
	}
	const stream = fs.createReadStream(resourceFullName);
	stream.pipe(res);
});

server.listen(8080);

server.on('listening', () => console.log('server listening on 8080!'));