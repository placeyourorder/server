var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var models = require('./models/models.js');
var common  = require('./common.js');
var app = express();

var server = app.listen(1337, function () {

  var host = server.address().address;
  var port = server.address().port;
  var config =  common.config();

  console.log('App listening at http://%s:%s', host, port);

  mongoose.connect('mongodb://localhost/pyo');
  var db = mongoose.connection;
  db.on('error', function() {
  	console.log('Error conencting to database');
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use (function (error, req, res, next){
    res.sendStatus(400);
  });

  models.initialize();
  require('./routes')(app);
});