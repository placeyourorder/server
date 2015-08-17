/* 
 * @Author: renjithks
 * @Date:   2015-08-06 02:37:36
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-14 16:36:11
 */

'use strict';

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
};