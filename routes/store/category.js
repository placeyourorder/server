/* 
* @Author: renjithks
* @Date:   2015-07-14 02:10:39
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-06 02:47:18
*/

'use strict';

var async = require('async');
var mongoose = require('mongoose');
var _ = require('underscore');
var models = require('../../models/models.js');
var util =  require('../util.js');
var ensureAuthenticated = util.ensureAuthenticated;

module.exports = function(app) {
  app.get('/stores/:storeId/categories', ensureAuthenticated,  function(req, res) {
    var categories = mongoose.model('category');
    categories.find({
      store_id: req.params.storeId,
      tags: req.query.category
    }, function(err, result) {
      if (err) return res.send(500).end();
      res.send(result);
    });
  });
 }