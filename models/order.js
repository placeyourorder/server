/* 
* @Author: renjithks
* @Date:   2015-07-01 00:19:37
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var mongoose = require('mongoose');
module.exports = function() {
  var lineItemSchema = new mongoose.Schema({
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit_price: {
      type: Number
    },
    total_price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['CREATED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'COMPLETED', 'CANCELLED']
    },
    variant: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  });
  var orderSchema = new mongoose.Schema({
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'store',
      required: true
    },
    address: {
      address1: {
        type: String,
        required: true
      },
      address2: String,
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      zipcode: {
        type: String,
        required: true
      }
    },
    phone: {
      type: Number,
      required: true
    },
    line_items: [lineItemSchema],
    total_price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['CREATED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'COMPLETED', 'CANCELLED']
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date
    },
    created_by: String,
    updated_by: String
  });
  mongoose.model('order', orderSchema, 'order');
}