/* 
* @Author: renjithks
* @Date:   2015-07-14 02:10:39
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-20 01:58:02
*/

'use strict';

var async = require('async');
var mongoose = require('mongoose');
var _ = require('underscore');
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

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