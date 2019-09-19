const http = require('http'),
	fs = require('fs'),
	path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');
    
const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

const server = http.createServer((req, res) => {
	
	const parsedUrl = url.parse(req.url); 
	console.log(`${req.method}\t${parsedUrl.pathname}`);
    const resourceName = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    
    if (isStatic(resourceName)){
		const resourceFullName = path.join(__dirname, resourceName);

        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        const stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    } else if (parsedUrl.pathname === '/calculator' && req.method === 'GET'){
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

server.listen(8080);

server.on('listening', () => console.log('server listening on 8080!'));