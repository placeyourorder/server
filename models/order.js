/* 
* @Author: renjithks
* @Date:   2015-07-01 00:19:37
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-23 17:33:47
*/
var mongoose = require('mongoose');
module.exports = function() {
  var lineItemSchema = new mongoose.Schema({
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number
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
      },
      uom: {
        type: String
      },
      quantity: {
        type: Number
      },
      price: {
        type: Number
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
      },
      address2: String,
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipcode: {
        type: String,
      },
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
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