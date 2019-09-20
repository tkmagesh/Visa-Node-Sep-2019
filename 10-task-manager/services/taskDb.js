const fs = require('fs'),
    path = require('path');
const dbFileName = path.join('./data/db.json');

/*
function getData(callback){
    fs.readFile(dbFileName, { encoding : 'utf8'}, (err, fileContents) => {
        if (err) return callback(err);
        let taskList = JSON.parse(fileContents);
        return callback(null, taskList);
    })
}

function saveData(taskList, callback){
    fs.writeFile(dbFileName, JSON.stringify(taskList), callback);
}
*/

// function getData(){
//     const promise = new Promise(function(resolveFn, rejectFn){
//         fs.readFile(dbFileName, { encoding : 'utf8'}, (err, fileContents) => {
//             if (err) return rejectFn(err);
//             let taskList = JSON.parse(fileContents);
//             return resolveFn(taskList);
//         })
//     });
//     return promise;
// }

// function saveData(taskList){
//     const promise = new Promise(function(resolveFn, rejectFn){
//         fs.writeFile(dbFileName, JSON.stringify(taskList), function(err){
//             if (err) return rejectFn(err);
//             return resolveFn(null);
//         });
//     });
//     return promise;
    
// }

const util = require('util');
const readFileAsync = util.promisify(fs.readFile),
    writeFileAsync = util.promisify(fs.writeFile);

async function getData(){
    const fileContents = await readFileAsync(dbFileName, { encoding : 'utf8'});
    let taskList = JSON.parse(fileContents);
    return taskList;
}

async function saveData(taskList){
    return await writeFileAsync(dbFileName, JSON.stringify(taskList));
}

module.exports = { getData, saveData };