/* 
 * @Author: renjithks
 * @Date:   2015-08-09 14:22:36
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-14 16:37:58
 */

'use strict';

exports.ensureAuthenticated = function(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
};