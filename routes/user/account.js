/* 
 * @Author: renjithks
 * @Date:   2015-08-16 22:04:05
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-03 00:47:10
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
    res.send(response);
  });
}