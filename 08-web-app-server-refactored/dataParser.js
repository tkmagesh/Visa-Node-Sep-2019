const url = require('url');

module.exports = function(req){
    const parsedUrl = url.parse(req.url); 
    req['parsedUrl'] = parsedUrl;
}