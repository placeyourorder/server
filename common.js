/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:54
*/
var env = require('./env.json');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
};