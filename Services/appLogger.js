const bunyan = require('bunyan'),
        fs = require('fs');

const environment = process.env.NODE_ENV || 'dev';
let options = { name: "emissions" };
if (environment === 'dev') {
        options['streams'] = [{
                stream: process.stdout
        }];
} else {
        let logFile = ((__dirname + '/../log/'));
        fs.existsSync(logFile) || fs.mkdirSync(logFile);
        options['streams'] = [{
                type: 'rotating-file',
                path: logFile + 'app.log',
                period: '1d', // daily rotation
                count: 30, //keep logs for a month
        }];
}
let appLogger = bunyan.createLogger(options);
module.exports = appLogger;