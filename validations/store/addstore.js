/* 
 * @Author: Renjith Sasidharan
 * @Date:   2015-09-27 16:39:59
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-29 00:12:17
 */

'use strict';

module.exports.addStoreSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "title": {
      "id": "title",
      "type": "string",
      "title": "Title"
    },
    "retailer": {
      "id": "retailer",
      "type": "object",
      "isValidMongoId": null,
      "isValidRetailer": null
    },
    "address": {
      "id": "address",
      "type": "object",
      "title": "Address",
      "properties": {
        "address1": {
          "id": "address1",
          "type": "string",
          "title": "Address 1"
        },
        "address2": {
          "id": "address2",
          "type": "string",
          "title": "Address 2"
        },
        "city": {
          "id": "city",
          "type": "string",
          "title": "City"
        },
        "state": {
          "id": "state",
          "type": "string",
          "title": "Sate"
        },
        "country": {
          "id": "country",
          "type": "string",
          "title": "Country"
        },
        "zipcode": {
          "id": "zipcode",
          "type": "string",
          "title": "Pin"
        },
        "phone": {
          "id": "phone",
          "type": "integer",
          "title": "Phone"
        },
        "latitude": {
          "id": "latitude",
          "type": "number",
          "title": "Latutude",
          "isValidLatitude": null
        },
        "longitude": {
          "id": "longitude",
          "type": "number",
          "title": "Longitude",
          "isValidLongitude": null
        }
      },
      "required": ["address1", "address2", "city", "state", "country", "zipcode", "phone", "latitude", "longitude"]
    }
  },
  "required": [
    "title",
    "address"
  ]
};

var models = require('../../models/models.js');
var mongoose = require('mongoose');
var deasync = require("deasync");


exports.initialize = function(validator) {
  validator.attributes.isValidRetailer = function validateRetailer(instance, schema, options, ctx) {
    var store = mongoose.model('store');
    var done, output;
    var data = validator.data;

    store.find({
      retailer: instance
    }, function(err, res) {
      setTimeout(function() {
        done = true;
        output = res;
      }, 1);
    });
    while (done === undefined) {
      deasync.runLoopOnce();
    }

    if (output.length) {
      return "You have a store created";
    }

    var user = mongoose.model('user');
    user.findById(instance, function(err, res) {
      setTimeout(function() {
        done = true;
        output = res;
      }, 1);
    });
    while (done === undefined) {
      deasync.runLoopOnce();
    }
    if (output.type != 'RETAILER') {
      return "You have not authorized to perform this action";
    }
  };

  validator.attributes.isValidLatitude = function validateLatitude(instance, schema, options, ctx) {
    var MIN_LAT = Math.toRadians(-90); // -PI/2
    var MAX_LAT = Math.toRadians(90); //  PI/2

    if (instance < MIN_LAT || instance > MAX_LAT)
      return "Invalid latitude " + JSON.stringify(instance);
  };

  validator.attributes.isValidLongitude = function validateLongitude(instance, schema, options, ctx) {
    var MIN_LON = Math.toRadians(-180); // -PI
    var MAX_LON = Math.toRadians(180); //  PI

    if (instance < MIN_LON || instance > MAX_LON)
      return "Invalid longitude " + JSON.stringify(instance);
  };
}
