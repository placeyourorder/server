var mongoose = require('mongoose');

module.exports = function() {
  var itemSchema = new mongoose.Schema({
    store_id: {type: mongoose.Schema.Types.ObjectId, ref: 'store'},
    item_id: String,
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