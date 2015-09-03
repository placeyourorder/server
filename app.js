/* 
 * @Author: renjithks
 * @Date:   2015-06-30 20:31:57
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-04 00:45:35
 */
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');
var models = require('./models/models.js');
var common = require('./common.js');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var config = common.config();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || config.appListenPort;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || config.appListenAddress;
app.set(server_port, server_ip_address);
var server = app.listen(server_port, server_ip_address, function() {

  var host = server.address().address;
  var port = server.address().port;

  models.initialize();
  console.log('App listening at http://%s:%s', host, port);

  //provide a sensible default for local development
  var connection_string = config.dbUrl;
  // if OPENSHIFT env variables are present, use the available connection info:
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
  }

  mongoose.connect(connection_string);
  var db = mongoose.connection;
  db.on('error', function() {
    console.log('Error conencting to database');
  });

  var allowCrossDomain = function(req, res, next) {
    console.log('Adding cross origin request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }

  app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));

  var User = mongoose.model('user');
  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(allowCrossDomain);
  app.use(function(error, req, res, next) {
    console.log(error);
    //res.sendStatus(400);
  });

  require('./routes')(app);
});