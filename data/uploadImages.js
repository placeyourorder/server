/* 
 * @Author: renjithks
 * @Date:   2015-10-15 23:35:50
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-15 23:54:06
 */

'use strict';

var fs = require('fs');
var async = require('async');
var gcloud = require('gcloud');

var gcs = gcloud.storage({
  projectId: '885252475091',
  keyFilename: 'key/PYO-APIs-7c01ebe658f4.json'
});

var bucket = gcs.bucket('pyo-temp-bucket');

var location = 'data/images/';
async.forEach(fs.readdirSync(location), function(file, callback) {
  console.log('Uploading ' + file);
  bucket.upload(location + file, function(err, f) {
    if (!err) {
      console.log('Uploaded ' + file);
      f.acl.add({
        entity: 'allUsers',
        role: gcs.acl.READER_ROLE
      }, function(err, aclObject) {});
      setTimeout(function() {
        callback();
      }, 200);
      return;
    } else {
      console.log(err);
      callback();
    }
  });
});
