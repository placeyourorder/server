var async = require('async');
var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');

module.exports = function(app)  {
  app.get('/stores/:storeId/orders', function (req, res) {
    console.log('Get orders for store ' + req.params.storeId);
    v.validate({id:req.params.storeId})
      if(errors) res.status(400).json(errors)
    var order = mongoose.model('order');
    order.find({store_id: req.params.storeId},function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });

  app.post('/stores/:store_id/orders', function (req, res) {
    var v = new Validator();
    var createOrderValidator = require('../validations/store/order/createorder.js');
    createOrderValidator.initialize(v);
    var order = mongoose.model('order');
    v.data = req.body;
    var result = v.validate(req.body, createOrderValidator.createOrderSchema);
    if(result.errors.length > 0) return res.status(400).json(result.errors);
    createOrder(req, res);
  });
};

var createOrder = function(req, res) {
  var orderJson = req.body;
  var orderTotal = 0;
  var storeId = orderJson.store_id;
  async.forEach(orderJson.line_items, function (lineItem, callback){
    var lineTotal = 0;
    var itemPrice = 0;
    var item = mongoose.model('item');
    item.findById(lineItem._id, function(err, result) {
      if(err) {
        console.log(err);
        callback(err);
      };
      var variation = _.findWhere(result.variations, {_id:lineItem._id});
      variation
      itemPrice = variation.price || result.price;
      lineTotal =  itemPrice * lineItem.quantity;
      orderTotal += lineTotal;
      lineItem.totalPrice = lineTotal;
      callback();
    });
  },
  function(err) {
      if(err) {
        console.log(err);
        res.send(500).end();
        return;
      }
      orderJson.totalPrice = orderTotal;
      var order = mongoose.model('order');
      console.log(orderJson);
      order.create(orderJson, function(err, result) {
        if(err) {
          console.log(err);
          res.send(500).end();
          return;
        }
        res.status(200).json(result);
      });
    }
  );
};