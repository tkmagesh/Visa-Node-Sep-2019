const fs = require('fs');

function getData(callback){
    fs.readFile(path.join('../data/db.json'), { encoding : 'utf8'}, (err, fileContents) => {
        if (err) return callback(err);
        let taskList = JSON.parse(fileContents);
        return callback(null, taskList);
    })

}