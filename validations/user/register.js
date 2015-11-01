/* 
* @Author: renjithks
* @Date:   2015-09-23 22:54:24
* @Last Modified by:   Renjith Sasidharan
* @Last Modified time: 2015-09-29 01:32:05
*/

'use strict';

module.exports.userRegisterSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "email": {
      "id": "email",
      "type": "email",
      "isEmailUnique": null
    },
    "phone": {
      "id": "phone",
      "type": "number",
      "length": 10
    },
    "password": {
      "id": "password",
      "type": "string",
      "minLength": 8,
      "maxLength": 32
    },
    "type": {
      "id": "type",
      "type": {
        "enum" : ["CUSTOMER", "RETAILER", "ADMIN"]
      },
    }
  },
  "required": ["email", "phone", "type"]
}

var models = require('../../models/models.js');
var mongoose = require('mongoose');
var deasync = require("deasync");


exports.initialize = function(validator) {
  validator.attributes.isEmailUnique = function validateEmail(instance, schema, options, ctx) {
    var user = mongoose.model('user');
    var done, output;
    var data = validator.data;

    user.findOne({
      email: instance
    }, function(err, res) {
      setTimeout(function() {
        done = true;
        output = res;
      }, 1);
    });
    while (done === undefined) {
      deasync.runLoopOnce();
    }

    if (output) {
      return "User name exists";
    }
  };
}