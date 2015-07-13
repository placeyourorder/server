/* 
* @Author: renjithks
* @Date:   2015-07-04 16:18:43
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-04 16:22:10
*/

'use strict';

var async = require('async');
var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');

module.exports = function(app) {
  app.get('/stores/:storeId/orders/:orderId', function(req, res) {
    var order = mongoose.model('order');
    order.findOne({
      store_id: req.params.storeId,
      _id: req.params.orderId
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });
 } 