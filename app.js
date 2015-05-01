var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/models.js');
var app = express();

var server = app.listen(1337, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

  mongoose.connect('mongodb://localhost/pyo');
  var db = mongoose.connection;
  db.on('error', function() {
  	console.log('Error conencting to database');
  });

  models.initialize();
  require('./routes')(app);
});