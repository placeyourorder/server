/* 
* @Author: renjithks
* @Date:   2015-08-09 12:39:26
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-09 14:02:46
*/

'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

module.exports = function() {

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
    }
  });
  mongoose.model('storeaddress', schema, 'storeaddress');
}