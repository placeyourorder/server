/*
 * @Author: renjithks
 * @Date:   2015-06-21 21:25:04
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-01 02:17:14
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
  require('./order/ordersearch.js')(app);

  require('./store/store.js')(app);
  require('./store/category.js')(app);
  require('./store/storesearch.js')(app);
  require('./store/itemsearch.js')(app);
  require('./store/item.js')(app);

  require('./user/register.js')(app);
  require('./user/login.js')(app);
  require('./user/logout.js')(app);
  require('./user/account.js')(app);
  require('./user/address.js')(app);
  require('./user/order.js')(app);
  require('./user/restore.js')(app);

  var util = require('../Utils/utils.js');

  var isAuthenticated = util.authentication.ensureAuthenticated;
  app.get('/',  function(req, res) {
    res.send('OK');
  });
  app.get('/testauth', isAuthenticated,  function(req, res) {
    res.send('OK');
  });
}