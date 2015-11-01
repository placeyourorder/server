/* 
 * @Author: renjithks
 * @Date:   2015-07-26 16:48:13
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 16:12:30
 */

'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var paginate = require('express-paginate');
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.post('/stores/:storeId/items/search', ensureAuthenticated, function(req, res) {
    console.log(req.query.page, req.query.limit)
    var itemModel = mongoose.model('item');
    var body = req.body;
    var searchParams = {
      'store_id': req.params.storeId,
    }
    if (body.tags) {
      if (typeof body.tags == 'string') {
        searchParams.tags = new RegExp(body.tags.toUpperCase(), 'i')
      } else if (Object.prototype.toString.call(body.tags) === '[object Array]') {
        searchParams.tags = {
          $all: _.map(body.tags, function(o) {
            return o.toUpperCase();
          })
        }
      }
    }
    if (body.name) {
      searchParams.name = new RegExp(body.name, 'i');
    }
    if (body.description) {
      searchParams.description = new RegExp(body.description, 'i');
    }
    console.log(searchParams);
    itemModel.paginate(searchParams, {
      page: req.query.page,
      limit: req.query.limit
    }, function(err, items, pageCount, itemCount) {
      if (err) return console.error(err);
      res.json({
        object: 'list',
        has_more: paginate.hasNextPages(req)(pageCount),
        pageCount: pageCount,
        itemCount: itemCount,
        data: items
      });
    });
    // itemModel.find(searchParams, function(err, items) {
    // });
  });
};
