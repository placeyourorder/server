"use strict";

module.exports.cancelOrderSchema =  {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "_id": {
      "id": "/_id",
      "type": "string",
      "isValidMongoId":null,
      "isValidOrderId":null,
      "isOrderCancelled":null
    },
    "store_id": {
      "id": "/store_id",
      "type": "string",
      "isValidMongoId":null
    },
    "line_items": {
      "id": "/line_items",
      "type": "array",
      "items": {
        "id": "/line_items/0",
        "type": "object",
        "properties": {
          "_id": {
            "id": "/line_items/0/_id",
            "type": "string",
            "isValidMongoId":null,
            "isValidLineItem":null
          }
        }
      }
    },
    "required": ["_id"]
  },
  "required": ["_id", "store_id"]
}

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

  validator.attributes.isOrderCancelled = function validateOrderState(instance, schema, options, ctx) {
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
      return "Error cancelling order " + JSON.stringify(instance);
    }
    if(output.status !== 'CREATED') {
      return "Order cannot be cancelled" + JSON.stringify(instance);
    }
  } 

  validator.attributes.isValidLineItem = function validateLineItem(instance, schema, options, ctx) {
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
      return "Error validating line item" + JSON.stringify(instance);
    }
    var lineItems = output.line_items;
    var item = _.find(lineItems, function(item) {
      return item._id.toString() === instance;
    })
    if(!item) {
      return "Invalid line item " + JSON.stringify(instance);
    } else {
      if(item.status !== 'CREATED') {
        return "Line item cannot be cancelled " + JSON.stringify(instance); 
      }
    }
  }
}