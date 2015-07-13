/* 
 * @Author: renjithks
 * @Date:   2015-07-12 21:37:16
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-13 23:35:34
 */

'use strict';

var mongoose = require('mongoose');
module.exports = function() {

  var schema = new mongoose.Schema({
    store_id: {type: mongoose.Schema.Types.ObjectId, ref: 'store'},
    categories: Array
  });
  mongoose.model('categories', schema, 'categories');
}