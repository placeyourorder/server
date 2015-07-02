/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
"use strict";

module.exports = function(validator) {
  validator.attributes.isValidMongoId = function isValidMongoId(instance, schema, options, ctx) {
    var re = /^[0-9a-fA-F]{24}$/;
    console.log(re.test(instance));
    if(!re.test(instance)) {
      return 'Invalid id ' + JSON.stringify(instance);
    }
  };

  validator.attributes.isValidStore = function validateStoreId(instance, schema, options, ctx) {
    var store = mongoose.model('store');
    var done, output;
    store.findById(instance, function(err, res) {
      setTimeout(function(){
        done = true;
        output = res;
      }, 1);
    });
    while(done === undefined) {
      deasync.runLoopOnce();
    }
    if(!output) {
      return "Invalid store id " + JSON.stringify(instance);
    }
  };
}