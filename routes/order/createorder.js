/* 
* @Author: renjithks
* @Date:   2015-07-02 21:21:13
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-06 11:27:43
*/
"use strict";

var async = require('async');
var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var util =  require('../util.js');
var ensureAuthenticated = util.ensureAuthenticated;

module.exports = function(app) {
  app.get('/stores/:storeId/orders', ensureAuthenticated, function(req, res) {
    var order = mongoose.model('order');
    order.find({
      store_id: req.params.storeId
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });

  app.post('/stores/:store_id/orders', function(req, res) {
    console.log(req.body);
    var v = new Validator();
    var order = mongoose.model('order');
    v.data = req.body;
    var createOrderValidator = require('../../validations/store/order/createorder.js');
    createOrderValidator.initialize(v);
    var result = v.validate(req.body, createOrderValidator.createOrderSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    createOrder(req, res);
  });
};

function createOrder(req, res) {
  var orderJson = req.body;
  var orderTotal = 0;
  var storeId = orderJson.store_id;
  async.forEach(orderJson.line_items, function(lineItem, callback) {
      var lineTotal = 0;
      var itemPrice = 0;
      var item = mongoose.model('item');
      item.findById(lineItem.item_id, function(err, result) {
        if (err) {
          log.error({
            createOrder: err
          });
          callback(err);
        };
        if (result.variations) {
          var variant = _.find(result.variations, function(rec) {
            if (rec._id.toString() === lineItem.variant._id) {
              return true;
            }
          });
          itemPrice = variant.price;
          lineItem.variant.uom = variant.uom;
          lineItem.variant.quantity = variant.quantity;
          lineItem.variant.price = variant.price;
          console.log(lineItem.variant);
        } else {
          itemPrice = result.price;
        }
        lineTotal = itemPrice * lineItem.quantity;
        orderTotal += lineTotal;
        lineItem.total_price = lineTotal;
        lineItem.status = "CREATED";
        lineItem.name = result.name;
        callback();
      });
    },
    function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(500).end();
        return;
      }
      orderJson.total_price = orderTotal;
      orderJson.status = "CREATED";
      var order = mongoose.model('order');
      console.log(orderJson);
      order.create(orderJson, function(err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500).end();
          return;
        }
        res.status(200).json(result);
      });
    }
  );
};