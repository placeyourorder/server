/* 
* @Author: renjithks
* @Date:   2015-06-22 22:27:59
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var mongoose = require('mongoose');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');

var getStoreSchema = require('../validations/store/getstore.js');
var v = new Validator();
require('../validations/commonvalidators.js')(v);

module.exports = function(app) {
  app.get('/stores', function(req, res) {
    var store = mongoose.model('store');
    store.find(function(err, stores) {
      if (err) return console.error(err);
      res.jsonp(stores);
    });
  });

  app.get('/stores/:storeId', function(req, res) {
    var store = mongoose.model('store');
    var result = v.validate({
      id: req.params.storeId
    }, getStoreSchema.isValidMongoIdScehma);
    console.log(result.errors);
    if (result.errors.length > 0) {
      res.jsonp(result.errors);
      return res.status(400).end()
    };
    store.findById(req.params.storeId, function(err, stores) {
      if (err) return console.error(err);
      console.log('Get stores');
      res.jsonp(stores);
    });
  });

  app.get('/stores/:storeId/items', function(req, res) {
    var item = mongoose.model('item');
    if (req.params.storeId.match(/^[0-9a-fA-F]{24}$/)) {
      item.find({
        'store_id': req.params.storeId
      }, function(err, items) {
        if (err) return console.error(err);
        console.log('Get items');
        res.jsonp(items);
      });
    } else {
      res.status(400).end();
    }
  });
};