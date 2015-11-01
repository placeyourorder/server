/* 
 * @Author: renjithks
 * @Date:   2015-10-15 02:18:07
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-15 23:34:25
 */

'use strict';

var gcloud = require('gcloud');
var lwip = require('lwip');
var fs = require('fs');
var random = require("random-js")();
var async = require('async');

var gcs = gcloud.storage({
  projectId: '885252475091',
  keyFilename: 'key/PYO-APIs-7c01ebe658f4.json'
});

var imageLoc;
var limit = 3;
var getColor = function() {
  return [random.integer(0, 255), random.integer(0, 255), random.integer(0, 255), 100]
}

// Create a new bucket.
console.log('Logging in');
var bucket = gcs.bucket('pyo-temp-bucket');
// bucket.acl.add({
//   entity: 'allUsers',
//   role: gcs.acl.READER_ROLE
// }, function(err, aclObject) {});

console.log('Login success');
var i = 0,j = 0,k = 0;
var array = Array.apply(null, Array(30)).map(Number.prototype.valueOf, 0);
async.forEach(array, function(o, callback) {
  lwip.create(1280, 720, getColor(), function(err, largeImage) {
    if (!err) {
      console.log('Created large image', imageLoc);
      imageLoc = 'data/images/' + i + '-large.jpg';
      i++;
      largeImage.writeFile(imageLoc, 'jpg', {
        quality: 100
      }, function(err) {
        if (!err) {
          setTimeout(function() {
            bucket.upload(imageLoc, function(err, file) {
              console.log(err);
              if (!err) {
                console.log('Uploaded large image');
                file.acl.add({
                  entity: 'allUsers',
                  role: gcs.acl.READER_ROLE
                }, function(err, aclObject) {});
                largeImage.resize(640, 360, 'lanczos', function(err, mediumImage) {
                  if (!err) {
                    console.log('Created medium image', imageLoc);
                    imageLoc = 'data/images/' + j + '-medium.jpg';
                    j++;
                    mediumImage.writeFile(imageLoc, 'jpg', {
                      quality: 100
                    }, function(err) {
                      if (!err) {
                        setTimeout(function() {
                          bucket.upload(imageLoc, function(err, file) {
                            console.log(err);
                            if (!err) {
                              file.acl.add({
                                entity: 'allUsers',
                                role: gcs.acl.READER_ROLE
                              }, function(err, aclObject) {});
                              console.log('Uploaded medium image');
                              mediumImage.resize(72, 72, 'lanczos', function(err, smallImage) {
                                if (!err) {
                                  console.log('Created small image', imageLoc);
                                  imageLoc = 'data/images/' + k + '-small.jpg';
                                  k++;
                                  smallImage.writeFile(imageLoc, 'jpg', {
                                    quality: 100
                                  }, function(err) {
                                    if (!err) {
                                      setTimeout(function() {
                                        bucket.upload(imageLoc, function(err, file) {
                                          console.log(err);
                                          if (!err) {
                                            file.acl.add({
                                              entity: 'allUsers',
                                              role: gcs.acl.READER_ROLE
                                            }, function(err, aclObject) {});
                                            console.log('Uploaded small image');
                                            callback();
                                          }
                                        })
                                      }, 1000);
                                    }
                                  })
                                }
                              });
                            }
                          })
                        }, 1000);
                      }
                    })
                  }
                });
              }
            })
          }, 1000);
        }
      });
    }
  });
})
