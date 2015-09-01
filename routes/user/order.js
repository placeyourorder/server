/* 
 * @Author: renjithks
 * @Date:   2015-08-23 23:14:24
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-23 23:41:25
 */

'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {

  app.get('/users/orders/', ensureAuthenticated, function(req, res) {
    var order = mongoose.model('order');
    order.find({
      created_by: req.user._id
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });

  app.get('/users/orders/:orderId', ensureAuthenticated, function(req, res) {
    var order = mongoose.model('order');
    order.findOne({
      _id: req.params.orderId,
      created_by: req.user._id
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });
}