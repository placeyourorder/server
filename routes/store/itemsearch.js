/* 
 * @Author: renjithks
 * @Date:   2015-07-26 16:48:13
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 01:57:29
 */

'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.post('/stores/:storeId/items/search', ensureAuthenticated,  function(req, res) {
    var itemModel = mongoose.model('item');
    var body = req.body;
    console.log(body);
    itemModel.find({
      'store_id': req.params.storeId,
      'tags': body.category
    }, function(err, items) {
      if (err) return console.error(err);
      res.jsonp(items);
    });
  });
};