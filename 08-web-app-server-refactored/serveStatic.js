const fs = require('fs'),
    path = require('path');
    
const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(publicFolderPath){
    return function(req, res, next){
        const resourceName = req.parsedUrl.pathname === '/' ? '/index.html' : req.parsedUrl.pathname;
        
        if (isStatic(resourceName)){
            const resourceFullName = path.join(publicFolderPath, resourceName);
            if (!fs.existsSync(resourceFullName))
                return next();
            
            const stream = fs.createReadStream(resourceFullName);
            stream.pipe(res);
            stream.on('end', next);
            
        } else {
            next();
        }
    };
};