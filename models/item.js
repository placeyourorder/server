/* 
* @Author: renjithks
* @Date:   2015-06-22 21:36:59
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var mongoose = require('mongoose');

module.exports = function() {
  var itemSchema = new mongoose.Schema({
    store_id: {type: mongoose.Schema.Types.ObjectId, ref: 'store'},
    item_id: String,
    name: String,
    description: String,
    quantity: Number,
    uom: String,
    price: Number,
    discount: Number,
    variations: [{
      sku: String,
      quantity: Number,
      uom: String,
      price: Number
    }],
    tags:[String]
  });
  mongoose.model('item', itemSchema, 'item');

  // var tagSchema  =  new mongoose.Schema({
  //   item_id:{type: Schema.Types.ObjectId, ref: 'item'}
  // });
  // mongoose.model('tag', tagSchema, 'tag');
};