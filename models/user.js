/* 
 * @Author: renjithks
 * @Date:   2015-08-05 15:51:47
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 15:26:17
 */

'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

module.exports = function() {

  var address = new mongoose.Schema({
    address: {
      address1: {
        type: String,
        trim: true,
      },
      address2: {
        type: String,
        required: false
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zipcode: {
        type: String,
        trim: true,
      },
      phone: {
        type: Number,
        trim: true,
      },
      latitude: Number,
      longitude: Number
    }
  });

  var schema = new mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    type: {
      type: String,
      required: true,
      enum: ['CUSTOMER', 'RETAILER']
    },
    phone: {
      type: Number,
      required: true,
      trim: true
    },
    address: [address]
  });
  schema.plugin(passportLocalMongoose, {
    usernameField: 'email'
  });
  mongoose.model('user', schema, 'user');
}