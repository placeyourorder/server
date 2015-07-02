/* 
* @Author: renjithks
* @Date:   2015-06-30 20:31:57
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:54
*/
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var models = require('./models/models.js');
var common = require('./common.js');
var app = express();

var server = app.listen(1337, function() {

  var host = server.address().address;
  var port = server.address().port;
  var config = common.config();

  console.log('App listening at http://%s:%s', host, port);

  mongoose.connect('mongodb://localhost/pyo');
  var db = mongoose.connection;
  db.on('error', function() {
    console.log('Error conencting to database');
  });

  var allowCrossDomain = function(req, res, next) {
    console.log('Adding cross origin request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //res.header('Access-Control-Allow-Headers', 'X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(allowCrossDomain);
  app.use(function(error, req, res, next) {
    res.sendStatus(400);
  });

  app.use(function(req, res, next) {
    //res.set('X-XSS-Protection', 0);
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  models.initialize();
  require('./routes')(app);
});