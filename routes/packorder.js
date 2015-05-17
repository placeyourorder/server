"use strict";

var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../models/models.js');
var log =  require('../logger.js');

module.exports = function(app) {
	app.put('/stores/:storeId/orders/:orderId/pack', function(req, res) {
		log.info(req.body);
		var v = new Validator();
		var packOrderValidator = require('../validations/store/order/packorder.js');
		packOrderValidator.initialize(v);
		v.data =  req.body;
		var result = v.validate(req.body, packOrderValidator.packOrderSchema);
		if(result.errors.length > 0) return res.status(400).json(result.errors);
		packOrder(req, res);
	})
};

function packOrder(req, res) {
	var packOrderJson = req.body;
	var order = mongoose.model('order');
	var orderId = packOrderJson._id;

	order.findById(orderId, function(err, dbDoc) {
		var itemFromDB;
			_.each(packOrderJson.line_items, function(itemToPack) {
				itemFromDB = _.find(dbDoc.line_items, function(item) {
					return item._id.toString() === itemToPack._id;
				});
				itemFromDB.status = 'PACKED';
				itemFromDB.updated_at = Date.now();
			});
			var isEveryItemPacked =  _.every(dbDoc.line_items, function(item) {
				if(item.status === 'PACKED') {
					return true;
				}
				return false;
			});
			if(isEveryItemPacked) {
				dbDoc.status = 'PACKED';
				dbDoc.updated_at = Date.now();
			}
			dbDoc.save();
			res.status(200).json(dbDoc);
			log.debug({packedOrder: dbDoc});
	});
}