/* 
 * @Author: renjithks
 * @Date:   2015-09-19 15:58:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-15 02:14:14
 */

'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.put('/stores/:storeId/items', ensureAuthenticated, function(req, res) {
    var v = new Validator();
    var updateItemValidator = require('../../validations/store/item/updateitem.js');
    v.data = req.body;
    var result = v.validate(req.body, updateItemValidator.updateItemSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    updateItem(req, res);
  });

  app.post('/stores/:storeId/items', ensureAuthenticated, function(req, res) {
    var v = new Validator();
    var addItemValidator = require('../../validations/store/item/additem.js');
    v.data = req.body;
    var result = v.validate(req.body, addItemValidator.addItemSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    addItem(req, res);
  });

  app.delete('/stores/:storeId/items/:itemId', ensureAuthenticated, function(req, res) {
    var v = new Validator();
    var deleteItemValidator = require('../../validations/store/item/removeitem.js');
    var result = v.validate({
      _id: req.params.itemId,
      store_id: req.params.storeId
    }, deleteItemValidator.removeItemSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    deleteItem(req, res);
  });
};

function deleteItem(req, res) {
  var itemModel = mongoose.model('item');
  itemModel.remove({
    _id: req.params.itemId,
    store_id: req.params.storeId
  }, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500).end();
      return;
    } else {
      res.sendStatus(200);
    }
  });
}

function addItem(req, res) {
  var itemModel = mongoose.model('item');
  var data = req.body;
  itemModel.create(data, function(err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(500).end();
      return;
    }
    res.status(200).json(result);
  });
}

function updateItem(req, res) {
  var itemModel = mongoose.model('item');
  var data = req.body;

  itemModel.findById(data._id, function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    doc.name = data.name;
    doc.description = data.description;
    doc.tags = data.tags;
    doc.variations = data.variations;
    doc.save(cb);
  })

  function cb(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  }
}
