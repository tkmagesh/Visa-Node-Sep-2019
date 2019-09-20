const url = require('url'),
    querystring = require('querystring');

module.exports = function(req, res, next){
    const parsedUrl = url.parse(req.url); 
    req['parsedUrl'] = parsedUrl;
    req['queryData'] = querystring.parse(req.parsedUrl.query);
    let rawData = '';
    req.on('data', chunk => rawData += chunk);
    req.on('end', () => {
        req['bodyData'] = querystring.parse(rawData);
        next();
    });
}