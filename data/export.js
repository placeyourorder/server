/* 
 * @Author: renjithks
 * @Date:   2015-06-12 22:08:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-09 14:08:04
 */
var mongoose = require('mongoose');
var storesJson = require('./stores.js');
var itemsJson = require('./items.js');
var categoriesJson = require('./categories.js');
var models = require('../models/models.js');

models.initialize();
mongoose.connect('mongodb://localhost/pyo');

//Import  stores
console.log('Starting..');
var storeModel = mongoose.model('store');
var me = this;
storeModel.remove({}, function(err) {
  var me = this;
  if (err) return console.log(err);
  console.log('store collection removed');
  storeModel.create(storesJson, function(err, stores) {
    var me = this;
    if (err) return console.error(err);
    console.log('stores exported');
    //Import items for stores
    var itemsModel = mongoose.model('item');
    itemsModel.remove({}, function(err) {
      console.log('item collection removed');
    });

    var categoriesModel = mongoose.model('category');
    categoriesModel.remove({}, function(err) {
      console.log('categories collection removed');
    });
    storeModel.find(function(err, storeResult) {
      if (err) return console.log(err);
      for (i = 0; i < storeResult.length; i++) {
        //Add item
        for (j = 0; j < itemsJson.length; j++) {
          itemsJson[j].store_id = storeResult[i]._id;
        }
        itemsModel.create(itemsJson, function(err, res) {
          if (err) return console.error(err);
          console.log('items exported');
          return;
        });
        //Add category
        categoriesJson.store_id = storeResult[i]._id;
        categoriesModel.create(categoriesJson, function(err, res) {
          if (err) return console.error(err);
          console.log('categoriesModel exported');
          return;
        });
      }
      console.log('Done');
      return;
    }.bind(me));
    return;
  }.bind(me));
  return;
}.bind(me));