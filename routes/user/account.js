/* 
* @Author: renjithks
* @Date:   2015-08-16 22:04:05
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-16 23:20:05
*/

'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');
var models = require('../../models/models.js');
var util =  require('../util.js');
var ensureAuthenticated = util.ensureAuthenticated;

module.exports = function(app) {
  app.get('/users/account', ensureAuthenticated,  function(req, res) {
    console.log('Get user account');
    var user = mongoose.model('user');
    user.find({
      _id: req.user._id,
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });
 }