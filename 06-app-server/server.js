const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	calculator = require('./calculator'),
	querystring = require('querystring');

const server = http.createServer((req, res) => {
	
	const parsedUrl = url.parse(req.url); 
	console.log(`${req.method}\t${parsedUrl.pathname}`);
	const resourceName = parsedUrl.pathname;
		
	if (parsedUrl.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(parsedUrl.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	} else if (parsedUrl.pathname === '/calculator' && req.method === 'POST'){
		let rawData = '';
		req.on('data', chunk => rawData += chunk);
		req.on('end', () => {
			var bodyData = querystring.parse(rawData),
				op = bodyData.op,
				x = parseInt(bodyData.x),
				y = parseInt(bodyData.y),
				result = calculator[op](x,y);

			res.write(result.toString());
			res.end();
		})
		
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8085);

server.on('listening', () => console.log('server listening on 8085!'));