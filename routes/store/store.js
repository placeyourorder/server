/* 
 * @Author: renjithks
 * @Date:   2015-06-22 22:27:59
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-28 03:21:46
 */
var mongoose = require('mongoose');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

var getStoreSchema = require('../../validations/store/getstore.js');
var v = new Validator();
require('../../validations/commonvalidators.js')(v);

module.exports = function(app) {
  app.get('/stores', ensureAuthenticated, function(req, res) {
    var store = mongoose.model('store');
    store.find(function(err, stores) {
      if (err) return console.error(err);
      res.jsonp(stores);
    });
  });

  app.get('/stores/:storeId', ensureAuthenticated, function(req, res) {
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

  app.get('/stores/:storeId/items', ensureAuthenticated, function(req, res) {
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

  app.post('/stores', ensureAuthenticated, function(req, res) {
    var v = new Validator();
    var addStoreValidator = require('../../validations/store/addstore.js');
    v.data = req.body;
    v.data.retailer = req.user._id;
    addStoreValidator.initialize(v);
    var result = v.validate(v.data, addStoreValidator.addStoreSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    addStore(req, res);
  })

  function addStore(req, res) {
    var storeModel = mongoose.model('store');
    var data = req.body;
    data.retailer = req.user._id;
    storeModel.create(data, function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500).end();
        return;
      }

      app.acl.allow(result._id, ['/stores'], '*');
      res.status(200).json(result);
    });
  }

  app.put('/stores/:storeId', ensureAuthenticated, function(req, res) {
    var v = new Validator();
    var editStoreValidator = require('../../validations/store/editstore.js');
    v.data = req.body;
    v.data.retailer = req.user._id;
    editStoreValidator.initialize(v);
    var result = v.validate(v.data, editStoreValidator.editStoreSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    editStore(req, res);
  })

  function editStore(req, res) {
    var storeModel = mongoose.model('store');
    var data = req.body;
    data.retailer = req.user._id;
    storeModel.findById(data._id, function(err, doc) {
      if (err) {
        console.log(err);
        res.sendStatus(500).end();
        return;
      }
      doc.title = data.title;
      doc.address = data.address;
      doc.save(cb);
    });

    function cb(err, doc) {
      if (err) {
        console.log(err);
        res.sendStatus(404);
        return;
      }
      res.sendStatus(200);
    }
  }
};
