/* 
 * @Author: renjithks
 * @Date:   2015-08-18 19:37:01
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 02:35:50
 */

'use strict';

var mongoose = require('mongoose');
var nodeUtil = require('util');
var _ = require('underscore');
var request = require('request');
var Validator = require('jsonschema').Validator;
var models = require('../../models/models.js');
var util = require('../../Utils/utils.js');
var config = require('../../common.js').config();
var ensureAuthenticated = util.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.get('/users/address/:addressId', ensureAuthenticated, function(req, res) {
    var user = mongoose.model('user');
    user.findOne({
      adderess: {
        _id: addressId
      },
      address: 1
    }, function(err, result) {
      if (err) return res.sendStatus(500);
      res.send(result);
    });
  });

  app.post('/users/address', ensureAuthenticated, function(req, res) {
    var user = mongoose.model('user');
    var v = new Validator();
    v.data = req.body;
    var addressValidator = require('../../validations/user/address.js');
    //addressValidator.initialize(v);
    var result = v.validate(req.body, addressValidator.addressCreateSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    createAddress(req, res);
  });

  app.put('/users/address/:addressId', ensureAuthenticated, function(req, res) {
    var user = mongoose.model('user');
    var v = new Validator();
    v.data = req.body;
    var addressValidator = require('../../validations/user/address.js');
    //addressValidator.initialize(v);
    var result = v.validate(req.body, addressValidator.addressCreateSchema);
    if (result.errors.length > 0) return res.status(400).json(result.errors);
    updateAddress(req, res);
  });

  app.delete('/users/address/:addressId', ensureAuthenticated, function(req, res) {
    var user = mongoose.model('user');
    user.findByIdAndUpdate({
      _id: req.user._id,
    }, {
      $pull: {
        'address': {
          _id: req.params.addressId
        }
      }
    }, function(err) {
      if (err) return res.send(500).end();
      util.user.getUserAccount(req, function(err, result) {
        if (err) return res.send(500).end();
        res.send(result);
      })
    });
  });

  function updateAddress(req, res) {
    var user = mongoose.model('user');
    console.log(address);
    user.update({
      _id: req.user._id,
      'address._id': req.params.addressId
    }, {
      $set: {
        'address.$': address
      }
    }, function(err) {
      if (err) return res.send(500).end();
      util.user.getUserAccount(req, function(err, result) {
        if (err) return res.send(500).end();
        res.send(result);
      })
    });
  }

  function createAddress(req, res) {
    var address = req.body;
    var user = mongoose.model('user');
    user.findByIdAndUpdate({
        _id: req.user._id
      }, {
        $push: {
          address: address
        }
      }, {
        safe: true,
        upsert: true
      },
      function(err, result) {
        console.log(result);
        if (err) return res.send(500).end();
        request(util.format('http://%s:%s', config.appListenAddress, config.appListenPort), function(error, response, result) {
          if (!error && response.statusCode == 200) {
            var response = {
              _id: result._id,
              email: result.email,
              phone: result.phone,
              address: result.address
            }
            res.send(response);
          } else {
            return res.send(500).end();
          }
        })
      });
  }
}