/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
var mongoose = require('mongoose');
module.exports = function() {

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
        items: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}]
    });
    mongoose.model('store', schema, 'store');
}