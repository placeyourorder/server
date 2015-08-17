/* 
 * @Author: renjithks
 * @Date:   2015-08-05 17:15:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 10:17:14
 */

'use strict';

var models = require('../../models/models.js');
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(app) {
  app.post('/users/register', function(req, res) {
    var User = mongoose.model('user');
    User.register(new User({
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      type: req.body.type
    }), req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.sendStatus(200);
    });
  });
}