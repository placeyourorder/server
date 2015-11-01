/* 
 * @Author: renjithks
 * @Date:   2015-06-22 21:36:59
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-16 00:07:54
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

module.exports = function() {

  var variationsSchema = new mongoose.Schema({
    sku: String,
    quantity: {
      type: Number,
      required: true
    },
    uom: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });

  var itemSchema = new mongoose.Schema({
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'store',
      required: true
    },
    item_id: String,
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      small: [{
        type: String
      }],
      medium: [{
        type: String
      }],
      large: [{
        type: String
      }]
    },
    quantity: Number,
    uom: String,
    price: Number,
    discount: Number,
    variations: [variationsSchema],
    tags: [{
      type: String,
      required: true,
      trim: true,
      uppercase: true
    }]
  });
  itemSchema.plugin(mongoosePaginate);
  mongoose.model('item', itemSchema, 'item');
};
