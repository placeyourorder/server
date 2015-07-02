/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:54
*/
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