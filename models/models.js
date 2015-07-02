/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var fs = require('fs');

exports.initialize = function(){
  fs.readdirSync(__dirname).forEach(function(file) {
      if (file == "models.js") return;
      var name = file.substr(0, file.indexOf('.'));
      require('./' + name)();
  });
}