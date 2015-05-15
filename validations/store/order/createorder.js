module.exports.createOrderSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "store_id": {
      "id": "/store_id",
      "type": "string",
      "isValidStore":null
    },
    "address": {
      "id": "/address",
      "type": "object",
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
        "properties": {
          "_id": {
            "id": "/line_items/0/_id",
            "type": "string",
            "isValidItemId":null
          },
          "quantity": {
            "id": "/line_items/0/quantity",
            "type": "integer"
          },
          "unit_price": {
            "id": "/line_items/0/unit_price",
            "type": "number"
          }
        }
      }
    },
    "variations": {
      "id":"/variations",
      "type": "array",
      "items": {
        "id": "/variations/0",
        "type": "object",
        "properties": {
          "_id": {
            "id": "/variations/0/_id",
            "type": "string"
          },
          "sku": {
            "id": "/variations/0/sku",
            "type": "string"
          },
          "quantity": {
            "id": "/variations/0/quantity",
            "type": "string"
          },
          "price": {
            "id": "/variations/0/price",
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "store_id",
    "address",
    "phone",
    "line_items"
  ]
}

var mongoose = require('mongoose');
var async  = require('async');
//TODO: Use root path?
var models = require('../../../models/models.js');

exports.initialize = function(validator) {
  validator.attributes.isValidStore = function validateStoreId(instance, schema, options, ctx) {
    var store = mongoose.model('store');
    var done, output;
    store.findById(instance, function(err, result) {
      done = true;
      output = result;
    });
    while(done === undefined) {
      console.log("Waiting for async call..");
      require('deasync').runLoopOnce();
    }
    if(!output)
    return 'Invalid store id ' + JSON.stringify(instance);
  };

  validator.attributes.isValidItemId = function validateItemId(instance, schema, options, ctx) {
    var item = mongoose.model('item');
    var done, output;
    item.find({store_id: validator.data.store_id, _id: instance}, function(err, result) {
      done = true;
      output = result;
    });
    while(done === undefined) {
      console.log("Waiting for async call..");
      require('deasync').runLoopOnce();
    }
    if(!output)
    return 'Invalid item id ' + JSON.stringify(instance);
  };
};
