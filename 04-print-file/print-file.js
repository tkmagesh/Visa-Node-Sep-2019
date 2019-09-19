const fs = require('fs');

//Sync
/*
try {
	const fileContents = fs.readFileSync('./sample1.txt', { encoding : 'utf8'});
	console.log(fileContents);
} catch (err){
	console.log('Something went wrong!!');
}
*/


//Async using callback
/*fs.readFile('./sample1.txt', { encoding : 'utf8' }, function(err, fileContents){
	if (err){
		console.log('Something went wrong!!');
		return;
	}
	console.log(fileContents);
});*/

//Async using streams
const stream = fs.createReadStream('./sample1.txt', { encoding : 'utf8'} );

//events - open, data, end, close, error

/*stream.on('data', function(fileChunk){
	console.log(fileChunk);
});

stream.on('end', function(){
	console.log('Thats all folks!!');
});

stream.on('error', function(err){
	console.log('Something went wrong');
});

*/

stream.pipe(process.stdout);

stream.on('error', function(err){
	console.log('Something went wrong');
});



