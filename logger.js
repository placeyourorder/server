var bunyan = require('bunyan'); 
var common  = require('./common.js');

config =  common.config();
console.log("Log leve " + config.logLevel );
var log = bunyan.createLogger({
    name: 'server',
    streams: [{
        type: 'rotating-file',
        path: './log/server.log',
        period: '1m',
        count: 1,
        level: config.logLevel
    }]
});

module.exports = log;