/* 
 * @Author: renjithks
 * @Date:   2015-08-11 11:36:18
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-11 11:37:07
 */

'use strict';

var models = require('../../models/models.js');
var express = require('express');
var passport = require('passport');

module.exports = function(app) {
  app.get('/users/logout', function(req, res) {
    req.logout();
    req.session.save(function(err) {
      if (err) {
        return res.send(400).end();
      }
      res.send(200).end();
    });
  });
}