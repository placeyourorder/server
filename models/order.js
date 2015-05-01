var mongoose = require('mongoose');
module.exports = function() {
    var lineItemSchema =  new mongoose.Schema({
        item_id: String,
        quantity: Number,
        unit_price: Number,
        total_price: Number,
        discount: Number
    });
    var orderSchema = new mongoose.Schema({
        store_id: String,
        address: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            country: String,
            zipcode: String
        },
        phone: Number,
        line_items: [lineItemSchema],
        status: String,
        authorization_status: String,
        total_price: Number
    });
    mongoose.model('order', orderSchema, 'order');
}