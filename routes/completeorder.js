/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:54
*/
"use strict";

var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');
var log =  require('../logger.js');

module.exports = function(app) {
	app.put('/stores/:storeId/orders/:orderId/complete', function(req, res) {
		log.info(req.body);
		var v = new Validator();
		var completeOrderValidator = require('../validations/store/order/completeorder.js');
		completeOrderValidator.initialize(v);
		v.data =  req.body;
		var result = v.validate(req.body, completeOrderValidator.completeOrderSchema);
		if(result.errors.length > 0) return res.status(400).json(result.errors);
		completeOrder(req, res);
	})
};

function completeOrder(req, res) {
	var completeOrderJson = req.body;
	var order = mongoose.model('order');
	var orderId = completeOrderJson._id;

	order.findById(orderId, function(err, dbDoc) {
			_.each(dbDoc.line_items, function(item) {
				if(item.status === 'DELIVERED') {
					item.status = 'COMPLETED';
					item.updated_at = Date.now();
				}
			});
			dbDoc.status = 'COMPLETED';
			dbDoc.updated_at = Date.now();
			dbDoc.save();
			res.status(200).json(dbDoc);
			log.debug({packedOrder: dbDoc});
	});
}