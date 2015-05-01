var mongoose = require('mongoose');
var models = require('../models/models.js');

mongoose.set('debug', true);

module.exports = function(app)  {
  app.get('/stores/:storeId/orders', function (req, res) {
    var order = mongoose.model('order');
    console.log('Get orders for store ' + req.params.storeId);
    if (req.params.storeId.match(/^[0-9a-fA-F]{24}$/)) {
      order.find(function(err, result) {
        if (err) {
          console.error(err);
          res.send(500).end();
        } else {
        res.send(result);
        }
      });
    }
    else
    {
      res.status(400).end();
    }
  });
};