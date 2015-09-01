/*
 * @Author: renjithks
 * @Date:   2015-06-21 21:25:04
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 01:59:33
 */
var fs = require('fs');

module.exports = function(app) {
  // fs.readdirSync(__dirname).forEach(function(file) {
  //   if (file == "index.js") return;
  //   var name = file.substr(0, file.indexOf('.'));
  //   require('./' + name)(app);
  // });
  require('./order/cancelorder.js')(app);
  require('./order/completeorder.js')(app);
  require('./order/dispatchorder.js')(app);
  require('./order/packorder.js')(app);
  require('./order/createorder.js')(app);
  require('./order/order.js')(app);

  require('./store/store.js')(app);
  require('./store/category.js')(app);
  require('./store/storesearch.js')(app);
  require('./store/itemsearch.js')(app);

  require('./user/register.js')(app);
  require('./user/login.js')(app);
  require('./user/logout.js')(app);
  require('./user/account.js')(app);
  require('./user/address.js')(app);
  require('./user/restore.js')(app);

  require('../Utils/utils.js');
}