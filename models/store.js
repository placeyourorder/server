var mongoose = require('mongoose');
module.exports = function() {
    var itemSchema = new mongoose.Schema({
        name: String,
        quantity: Number,
        uom: String,
        price: Number
    });
    var departmentSchema = new mongoose.Schema({
        name: String,
        items: [itemSchema]
    });
    var schema = new mongoose.Schema({
        title: String,
        address: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            country: String,
            zipcode: String
        },
        departments: [departmentSchema]
    });
    mongoose.model('store', schema, 'store');
}