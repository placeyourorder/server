/*
 * @Author: renjithks
 * @Date:   2015-08-09 00:05:36
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-09 20:35:28
 */

'use strict';

var common = require('../common.js');

Math.toDegrees = function(rad) {
  return rad * (180 / Math.PI);
}

Math.toRadians = function(deg) {
  return deg * (Math.PI / 180);
}

var distance = common.config().storeSearchMaxDistanceKm; //Distance from geocordianate
var radius = 6371; // Radius of earth

var radLat; // latitude in radians
var radLon; // longitude in radians

var degLat; // latitude in degrees
var degLon; // longitude in degrees

var MIN_LAT = Math.toRadians(-90); // -PI/2
var MAX_LAT = Math.toRadians(90); //  PI/2
var MIN_LON = Math.toRadians(-180); // -PI
var MAX_LON = Math.toRadians(180); //  PI

var checkBounds = function() {
  if (radLat < MIN_LAT || radLat > MAX_LAT ||
    radLon < MIN_LON || radLon > MAX_LON)
    return false;
}

var fromRadians = function(cordinates) {
  return {
    latitude: Math.toDegrees(cordinates.latitude),
    longitude: Math.toDegrees(cordinates.longitude)
  }
}

var boundingCoordinates = function() {
  // angular distance in radians on a great circle
  var radDist = distance / radius;

  var minLat = radLat - radDist;
  var maxLat = radLat + radDist;

  var minLon, maxLon;
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    var deltaLon = Math.asin(Math.sin(radDist) /
      Math.cos(radLat));
    minLon = radLon - deltaLon;
    if (minLon < MIN_LON) minLon += 2 * Math.PI;
    maxLon = radLon + deltaLon;
    if (maxLon > MAX_LON) maxLon -= 2 * Math.PI;
  } else {
    // a pole is within the distance
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }

  return {
    min: {
      latitude: minLat,
      longitude: minLon,
    },
    max: {
      latitude: maxLat,
      longitude: maxLon
    }
  };
}

/**
 * @param latitude the latitude, in radians.
 * @param longitude the longitude, in radians.
 */

exports.getBoundingCoordinatesFromDegrees = function(latitude, longitude) {
    radLat = Math.toRadians(latitude);
    radLon = Math.toRadians(longitude);
    degLat = latitude;
    degLon = longitude;
    if (checkBounds() === false) {
      return false;
    }
    var result = boundingCoordinates();
    var degCords = {};
    degCords.max = fromRadians(result.max);
    degCords.min = fromRadians(result.min);
    return degCords;
  },

  exports.getBoundingCoordinatesFromRadians = function(latitude, longitude) {
    radLat = latitude;
    radLon = longitude;
    degLat = Math.toDegrees(latitude);
    degLon = Math.toDegrees(longitude);
    if (checkBounds() === false) {
      return false;
    }
    return boundingCoordinates();
  }