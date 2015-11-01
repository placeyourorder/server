/* 
 * @Author: renjithks
 * @Date:   2015-08-16 22:04:05
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-22 20:50:16
 */

'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.get('/users/:id/account', ensureAuthenticated, function(req, res) {
    var user = req.user;
    var response = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      address: user.address
    }
    console.log('Get user account');
    res.send(response);
  });
}