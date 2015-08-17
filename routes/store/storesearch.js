/* 
 * @Author: renjithks
 * @Date:   2015-08-09 11:46:31
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-11 11:45:57
 */

'use strict';

var common = require('../../common.js');

var _ = require('underscore');
var mongoose = require('mongoose');
var models = require('../../models/models.js');
var utils = require('../../Utils/utils.js');
var ensureAuthenticated = utils.authentication.ensureAuthenticated;

module.exports = function(app) {
  app.post('/stores/search', ensureAuthenticated, function(req, res) {
    var body = req.body;
    var boundingCordinates = utils.geolocation.getBoundingCoordinatesFromDegrees(body.address.latitude, body.address.longitude);
    console.log(boundingCordinates);
    var storeModel = mongoose.model('store');
    storeModel.find({
      'address.latitude': {
        $lte: boundingCordinates.max.latitude,
        $gte: boundingCordinates.min.latitude
      },
      'address.longitude': {
        $lte: boundingCordinates.max.longitude,
        $gte: boundingCordinates.min.longitude
      }
    }, function(err, items) {
      if (err) return console.error(err);
      var maxDistance = common.config().storeSearchMaxDistanceKm;
      var stores = _.filter(items, function(item) {
        var lat = item.address.latitude;
        var lon = item.address.longitude;
        var distance = getDistanceFromLatLon(lat, lon, body.address.latitude, body.address.longitude);
        if (distance <= maxDistance) {
          return true;
        }
      });
      res.json(stores);
    });
  });
};

function getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}