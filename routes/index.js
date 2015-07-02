/* 
* @Author: renjithks
* @Date:   2015-06-21 21:25:04
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var fs = require('fs');

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  });

  app.get('/', function(req, res) {
    return res.sendStatus(200);
  });
}