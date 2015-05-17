"use strict";

module.exports.createOrderSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "store_id": {
      "id": "/store_id",
      "type": "string",
      "isValidMongoId":null,
      "isValidStore":null
    },
    "address": {
      "id": "/address",
      "type": "object",
      "required": ["address1", "city", "state", "country", "zipcode"],
      "properties": {
        "address1": {
          "id": "/address/address1",
          "type": "string"
        },
        "address2": {
          "id": "/address/address2",
          "type": "string"
        },
        "city": {
          "id": "/address/city",
          "type": "string"
        },
        "state": {
          "id": "/address/state",
          "type": "string"
        },
        "country": {
          "id": "/address/country",
          "type": "string"
        },
        "zipcode": {
          "id": "/address/zipcode",
          "type": "string"
        }
      }
    },
    "phone": {
      "id": "/phone",
      "type": "integer"
    },
    "line_items": {
      "id": "/line_items",
      "type": "array",
      "items": {
        "id": "/line_items/0",
        "type": "object",
        "required": ["item_id", "quantity"],
        "properties": {
          "item_id": {
            "id": "/line_items/0/item_id",
            "type": "string",
            "isValidMongoId":null,
            "isValidItemId":null
          },
          "quantity": {
            "id": "/line_items/0/quantity",
            "type": "integer"
          },
          "variant": {
            "id":"/variant",
            "type": "object",
            "properties": {
              "_id": {
                "id": "/variant/_id",
                "type": "string",
                "isValidMongoId":null,
                "isValidItemVariantId":null
              }
            },
            "required": ["_id"]
          }
        }
      }
    }
  },
  "required": ["store_id", "address", "phone", "line_items"]
}

var _ = require("underscore");
var models = require('../../../models/models.js');
var mongoose = require('mongoose');
var deasync = require("deasync");

exports.initialize = function(validator) {
  validator.attributes.isValidItemId = function validateItemId(instance, schema, options, ctx) {
    var item = mongoose.model('item');
    var done, output;
    var data = validator.data;
    var itemObj = _.findWhere(data.line_items, {item_id: instance});
    item.findOne({store_id: data.store_id, _id: instance}, function(err, res) {
      setTimeout(function(){
        done = true;
        output = res;
      }, 1);
    });
    while(done === undefined) {
      deasync.runLoopOnce();
    }
    if(!output) {
      return "Invalid item id " + JSON.stringify(instance);
    }
    if(output.variations && itemObj.variant === undefined) {
      return "Variant is mandatory for item " + JSON.stringify(instance); 
    }
  };

  validator.attributes.isValidItemVariantId = function validateItemVariantId(instance, schema, options, ctx) {
    var item =  mongoose.model('item');
    var done, output;
    var data = validator.data;
    var itemObj = require('underscore').find(data.line_items, function(rec) {
      if(rec.variant && rec.variant._id === instance) {
        return true;
      }
    });
    item.find({store_id: data.store_id, _id: itemObj.item_id})
    .where('variations._id').equals(instance)
    .exec(function(err, res ) {
      setTimeout(function(){
        done = true;
        output = res;
      }, 1);
    });
    while(done === undefined) {
      deasync.runLoopOnce();
    }
    if(!output) {
      return "Invalid item variant id " + JSON.stringify(instance);  
    }
  };  
};

