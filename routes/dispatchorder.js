"use strict";

var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');
var log =  require('../logger.js');

module.exports = function(app) {
	app.put('/stores/:storeId/orders/:orderId/dispatch', function(req, res) {
		log.info(req.body);
		var v = new Validator();
		var dispatchOrderValidator = require('../validations/store/order/dispatchorder.js');
		dispatchOrderValidator.initialize(v);
		v.data =  req.body;
		var result = v.validate(req.body, dispatchOrderValidator.dispatchOrderSchema);
		if(result.errors.length > 0) return res.status(400).json(result.errors);
		dispatchOrder(req, res);
	})
};

function dispatchOrder(req, res) {
	var dispatchOrderJson = req.body;
	var order = mongoose.model('order');
	var orderId = dispatchOrderJson._id;

	order.findById(orderId, function(err, dbDoc) {
			_.each(dbDoc.line_items, function(item) {
				if(item.status === 'PACKED') {
					item.status = 'DISPATCHED';
					item.updated_at = Date.now();
				}
			});
			dbDoc.status = 'DISPATCHED';
			dbDoc.updated_at = Date.now();
			dbDoc.save();
			res.status(200).json(dbDoc);
			log.debug({packedOrder: dbDoc});
	});
}