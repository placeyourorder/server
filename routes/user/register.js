/* 
 * @Author: renjithks
 * @Date:   2015-08-05 17:15:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-02 15:55:36
 */

'use strict';

var models = require('../../models/models.js');
var Validator = require('jsonschema').Validator;
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(app) {
  app.post('/users/register', function(req, res) {
    console.log(req.body);
    var User = mongoose.model('user');
    var v = new Validator();
    var userRegValidator = require('../../validations/user/register.js');
    v.data = req.body;
    userRegValidator.initialize(v);
    var result = v.validate(req.body, userRegValidator.userRegisterSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    User.register(new User({
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      type: req.body.type
    }), req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      app.acl.addUserRoles(req.body.email.toLowerCase(), req.body.type);
      app.acl.allow(account.email, ['/users/account._id'], '*');
      if(account.type == 'RETAILER') {
        app.acl.allow(account.email, ['/stores'], '*');
      } else {
        app.acl.allow(account.email, ['/stores'], 'view');
      }
      res.sendStatus(200);
    });
  });
}