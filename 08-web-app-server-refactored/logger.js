const chalk = require('chalk');

module.exports = function(req, res, next){
	let logMessage = `${chalk.red(req.method)}\t${chalk.yellow(req.parsedUrl.pathname)}`;
	const startTime = new Date();
	res.on('finish', () => {
		const endTime = new Date(),
			elapsedTime = endTime-startTime;
		console.log(`${logMessage}\t${chalk.magenta(res.statusCode)}\t${chalk.bold(elapsedTime)}ms`);
	})
	next();
};