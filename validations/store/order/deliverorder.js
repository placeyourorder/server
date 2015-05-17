"use strict";

module.exports.deliverOrderSchema =  {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "_id": {
      "id": "/_id",
      "type": "string",
      "isValidMongoId":null,
      "isValidOrder":null
    },
    "store_id": {
      "id": "/store_id",
      "type": "string",
      "isValidMongoId":null
    }
  },
  "required": ["_id", "store_id"]
};

var _ = require("underscore");
var models = require('../../../models/models.js');
var mongoose = require('mongoose');
var deasync = require("deasync");

exports.initialize = function(validator) {
  validator.attributes.isValidOrderId = function validateOrderId(instance, schema, options, ctx) {
    var order = mongoose.model('order');
    var done, output, error;
    var data = validator.data;
    order.findOne({_id:data._id, store_id: data.store_id}, function(err, res) {
      setTimeout(function(){
        done = true;
        output = res;
        error = err;
      }, 1);
    });
    while(done === undefined) {
      deasync.runLoopOnce();
    }
    options.throwError = true;
    if(!output) {
      return "Invalid order id " + JSON.stringify(instance);
    }
  }

  validator.attributes.isValidOrder = function validateOrderState(instance, schema, options, ctx) {
    var order = mongoose.model('order');
    var done, output, error;
    var data = validator.data;
    order.findOne({_id:data._id, store_id: data.store_id}, function(err, res) {
      setTimeout(function(){
        done = true;
        output = res;
        error =  err;
      }, 1);
    });
    while(done === undefined) {
      deasync.runLoopOnce();
    }
    if(error) {
      return "Internal error " + JSON.stringify(instance);
    }
    if(output.status !== 'DISPATCHED') {
      return "Order cannot be delivered" + JSON.stringify(instance);
    }
  }  
}  