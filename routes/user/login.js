/* 
 * @Author: renjithks
 * @Date:   2015-08-05 17:41:04
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 01:04:56
 */

'use strict';

var models = require('../../models/models.js');
var express = require('express');
var passport = require('passport');

module.exports = function(app) {
  app.post('/users/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function(err) {
      if (err) {
        console.log(err);
        return res.send(400).end();
      }
      var user = req.user;
      var response = {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
      res.send(response);
    });
  });
}