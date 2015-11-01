/* 
 * @Author: renjithks
 * @Date:   2015-10-02 05:32:30
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-16 00:09:20
 */

'use strict';

var random = require("random-js")();

var mongoose = require('mongoose');
var storesJson = require('./stores.js');
var itemsJson = require('./items.js');
var categoriesJson = require('./categories.js');
var models = require('../models/models.js');
var common = require('../common.js');
var config = common.config();

models.initialize();

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

var imageBucket = 'https://storage.googleapis.com/pyo-temp-bucket/';
//https://storage.googleapis.com/pyo-temp-bucket/49-large.jpg

var tags = ['Fresh Vegetables', 'Salads & Herbs', 'Fresh Fruits',  'Organics', 'Chilled Deserts', 'Cheese', 'Milk, Butter, Eggs',
'Yoghurt', 'Cakes', 'Coffe', 'Juice Drinks', 'Soft Drinks', 'Water']

var uom = ['kg', 'gm', 'l', 'ml']

var storeModel = mongoose.model('store');
var itemsModel = mongoose.model('item');
var totalItems = 400;

storeModel.find(function(err, storeResult) {
  if (err) return console.log(err);
  for (var i = 0; i < storeResult.length; i++) {
    for (var j = 0; j < totalItems; j++) {
      var item = {};
      var numTags = random.integer(1, 10);
      item.store_id = storeResult[i]._id;
      item.name = random.string(8);
      item.description = random.string(8) + ' ' + random.string(8) + ' ' + random.string(8);
      item.tags = random.sample(tags, numTags);
      var imageId = random.integer(0, 100);
      item.images = {};
      item.images.small = [imageBucket + imageId + '-small.jpg'];
      item.images.medium = [imageBucket + imageId + '-medium.jpg'];
      item.images.large = [imageBucket + imageId + '-large.jpg'];
      var numVariations = random.integer(1, 10);
      var variations = [];
      var _uom = random.pick(uom)
      while (numVariations) {
        variations.push({
          quantity: random.integer(1, 100),
          uom: _uom,
          price: random.integer(1, 1000)
        });
        numVariations--;
      }
      item.variations = variations;
      console.log((i+1)*(j+1));
      itemsModel.create(item, function(err, res) {
        if (err) return console.error(err);
      });
    }
  }
  console.log('Done');
});
