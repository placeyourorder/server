var mongoose = require('mongoose');
var models = require('../models/models.js');

mongoose.set('debug', true);

module.exports = function(app) {
  app.get('/stores', function (req, res) {
  var store = mongoose.model('store');
    store.find(function(err, stores) {
        if (err) return console.error(err);
        console.log('Get stores');
      res.send(stores);
  });
  });

  app.get('/stores/:storeId', function (req, res) {
    var store = mongoose.model('store');
    if (req.params.storeId.match(/^[0-9a-fA-F]{24}$/)) {
      store.findById(req.params.storeId, function(err, stores) {
            if (err) return console.error(err);
            console.log('Get stores');
          res.send(stores);
      });
    }
    else
    {
      res.status(400).end();
    }
  });

  app.get('/stores/:storeId/items', function (req, res) {
    var store = mongoose.model('store');
    if (req.params.storeId.match(/^[0-9a-fA-F]{24}$/)) {
      store.findById(req.params.storeId, function(err, stores) {
            if (err) return console.error(err);
            console.log('Get items');
          res.send(stores.departments);
      });
    }
    else
    {
      res.status(400).end();
    }
  });

  app.get('/stores/:storeId/order', function (req, res) {
    var order = mongoose.model('order');
    if (req.params.storeId.match(/^[0-9a-fA-F]{24}$/)) {
      order.find(function(err, result) {
            if (err) return console.error(err);
            console.log('Get order');
          res.send(result);
      });
    }
    else
    {
      res.status(400).end();
    }
  });
};