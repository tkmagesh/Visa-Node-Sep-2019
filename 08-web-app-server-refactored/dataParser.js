const url = require('url');

module.exports = function(req, res, next){
    const parsedUrl = url.parse(req.url); 
    req['parsedUrl'] = parsedUrl;
    next();
}