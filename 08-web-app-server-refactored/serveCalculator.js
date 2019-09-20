const querystring = require('querystring'),
    calculator = require('./calculator');
    
module.exports = function(req, res, next){
    if (req.parsedUrl.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(req.parsedUrl.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
		next();
	} else if (req.parsedUrl.pathname === '/calculator' && req.method === 'POST'){
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
			next();
		})
		
	} else {
		next();
	}
}