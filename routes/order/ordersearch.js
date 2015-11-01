/* 
 * @Author: renjithks
 * @Date:   2015-10-01 01:57:19
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-02 02:23:27
 */

'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var paginate = require('express-paginate');
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.post('/orders/search', ensureAuthenticated, function(req, res) {
    var objectConstructor = {}.constructor;
    var orderModel = mongoose.model('order');
    var body = req.body;
    var filter = {};
    var sortBy = {
        created_at: 'desc'
    };
    if (body.sorting && body.sorting.constructor === objectConstructor && Object.keys(body.sorting).length) {
        sortBy = body.sorting;
    }
    if (body.filter && body.filter.constructor === objectConstructor && Object.keys(body.filter).length) {
      if (body.filter['storeId']) {
        filter.storeId = body.filter.storeId;
      }
      if (body.filter['created_at']) {
        filter.created_at = body.filter.created_at;
      }
      if (body.filter['status']) {
        filter.status = new RegExp(body.filter.status, 'i');
      }
      if (body.filter['phone']) {
        filter.phone = new RegExp(body.filter.phone, 'i');
      }
    }


    orderModel.paginate(filter, {
      page: req.query.page,
      limit: req.query.limit,
      sortBy : sortBy
    }, function(err, items, pageCount, itemCount) {
      if (err) {
        res.send(500);
        return console.error(err)
      };
      res.json({
        object: 'list',
        has_more: paginate.hasNextPages(req)(pageCount),
        pageCount: pageCount,
        itemCount: itemCount,
        data: items
      });
    });
  });
};
