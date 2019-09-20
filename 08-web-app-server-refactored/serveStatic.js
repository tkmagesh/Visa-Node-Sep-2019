const fs = require('fs'),
    path = require('path');
    
const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res, next){
    const resourceName = req.parsedUrl.pathname === '/' ? '/index.html' : req.parsedUrl.pathname;
    
    if (isStatic(resourceName)){
		const resourceFullName = path.join(__dirname, resourceName);

        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        /*
        const fileContents = fs.readFileSync(resourceFullName);
        res.write(fileContents);
        res.end();
        */
        const stream = fs.createReadStream(resourceFullName);
        //stream.pipe(res);
        
        stream.on('data', chunk => {
            console.log('[@serveStatic] serving file chunk');
            res.write(chunk);
        });
        stream.on('end', () => {
            console.log('[@serveStatic] ending response');
            res.end();
            next();
        });
        
    } else {
        next();
    }
};