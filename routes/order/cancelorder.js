/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-06 11:27:29
*/
"use strict";

var mongoose = require('mongoose');
var _ = require('underscore');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var log =  require('../../logger.js');
var util =  require('../util.js');
var ensureAuthenticated = util.ensureAuthenticated;

module.exports = function(app) {
	app.delete('/stores/:storeId/orders', ensureAuthenticated, function(req, res) {
		log.info(req.body);
		var v = new Validator();
		var cancelOrderValidator = require('../../validations/store/order/cancelorder.js');
		cancelOrderValidator.initialize(v);
		v.data =  req.body;
		var result = v.validate(req.body, cancelOrderValidator.cancelOrderSchema);
		if(result.errors.length > 0) return res.status(400).json(result.errors);
		deleteOrder(req, res);
	})
};

function deleteOrder(req, res) {
	var deleteOrderJson = req.body;
	var order = mongoose.model('order');
	var orderId = deleteOrderJson._id;
	//Full order cancel
	if(!deleteOrderJson.line_items) {
		order.findById(orderId, function(err, doc) {
			_.each(doc.line_items, function(item) {
				if(item.status !== 'CANCELLED') {
					item.status = 'CANCELLED';
					item.updated_at = Date.now();
				}
			});
			doc.status = 'CANCELLED';
			doc.updated_at = Date.now();
			doc.save();
			res.status(200).json(doc);
		})
	} 
	else {
		//Line item cancel
		order.findById({_id: orderId}, function(rer, doc) {
			var itemFromDB;
			_.each(deleteOrderJson.line_items, function(itemToDelete) {
				itemFromDB = _.find(doc.line_items, function(item) {
					return item._id.toString() === itemToDelete._id;
				})
				itemFromDB.status = 'CANCELLED';
				itemFromDB.updated_at = Date.now();
			})
			var isEveryItemCancelled =  _.every(doc.line_items, function(item) {
				if(item.status === 'CANCELLED') {
					return true;
				}
				return false;
			});
			if(isEveryItemCancelled) {
				doc.status = 'CANCELLED';
				doc.updated_at = Date.now();
			}
			doc.save();
			res.status(200).json(doc);
			log.debug({cancelOrder: doc});
		})
	}
}