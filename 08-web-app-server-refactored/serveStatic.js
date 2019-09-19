const fs = require('fs'),
    path = require('path');
    
const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res){
    const resourceName = req.parsedUrl.pathname === '/' ? '/index.html' : req.parsedUrl.pathname;
    
    if (isStatic(resourceName)){
		const resourceFullName = path.join(__dirname, resourceName);

        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        const stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    }
};