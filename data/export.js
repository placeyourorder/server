/* 
 * @Author: renjithks
 * @Date:   2015-06-12 22:08:35
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-16 00:07:17
 */
var mongoose = require('mongoose');
var storesJson = require('./stores.js');
var itemsJson = require('./items.js');
var categoriesJson = require('./categories.js');
var models = require('../models/models.js');
var common = require('../common.js');
var config = common.config();

models.initialize();
//provide a sensible default for local development
var connection_string = config.dbUrl;
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connection_string);

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