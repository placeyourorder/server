var mongoose = require('mongoose');
var storesJson = require('./stores.js');
var itemsJson = require('./items.js');
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
    storeModel.find(function(err, storeResult) {
      if (err) return console.log(err);
      for (i = 0; i < storeResult.length; i++) {
        for (j = 0; j < itemsJson.length; j++) {
          itemsJson[j].store_id = storeResult[i]._id;
        }
        itemsModel.create(itemsJson, function(err, res) {
          if (err) return console.error(err);
          console.log('items exported');
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