/* 
 * @Author: renjithks
 * @Date:   2015-08-20 01:29:19
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-02 23:41:20
 */

'use strict';

var mongoose = require('mongoose');
var models = require('../models/models.js');

exports.getUserAccount = function(req, next) {
  var user = mongoose.model('user');
  user.findById({
    _id: req.user._id
  }, function(err, res) {
    if (err)
      return next(err);
    next(null, {
      _id: res._id,
      email: res.email,
      phone: res.phone,
      address: res.address
    });
  });
};

exports.readyUserDetails = function(user) {
  return {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    address: user.address
  }
}
