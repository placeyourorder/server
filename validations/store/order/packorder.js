/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:54
*/
"use strict";

module.exports.packOrderSchema =  {
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
  "required": ["_id", "store_id", "line_items"]
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
      return "Error cancelling order " + JSON.stringify(instance);
    }
    if(output.status !== 'CREATED') {
      return "Order cannot be packed" + JSON.stringify(instance);
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
    console.log(lineItems);
    var item = _.find(lineItems, function(item) {
      return item._id.toString() === instance;
    })
    if(!item) {
      return "Invalid line item " + JSON.stringify(instance);
    } else {
      if(item.status !== 'CREATED') {
        return "Item cannot be packed " + JSON.stringify(instance); 
      }
    }
  } 
}  