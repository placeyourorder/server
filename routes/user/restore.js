/* 
 * @Author: renjithks
 * @Date:   2015-08-05 17:41:04
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 01:04:56
 */

'use strict';

var models = require('../../models/models.js');
var express = require('express');
var passport = require('passport');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "jatpatorder@gmail.com",
       pass: "renjith123"
   }
});

module.exports = function(app) {
  app.post('/users/restore', function(req, res) {
    var User = mongoose.model('user');
    
    smtpTransport.sendMail({
   from: "My Name <jatpatorder@gmail.com>", // sender address
   to: "Your Name <req.body.email.toLowerCase()>", // comma separated list of receivers
   subject: "Hello ✔", // Subject line
   text: "Hello world ✔" // plaintext body
  }, function(err, res){
    if(error){
       console.log(error);
       return res.sendStatus(400);
   }else{
       console.log("Message sent: " + res.message);
       res.sendStatus(200);
    }
    });

  //   User.register(new User({
  //     email: req.body.email.toLowerCase(),
  //     phone: req.body.phone,
  //     type: req.body.type
  //   }), req.body.password, function(err, account) {
  //     if (err) {
  //       console.log(err);
  //       return res.sendStatus(400);
  //     }
  //     res.sendStatus(200);
  //   });
  // });
});
}