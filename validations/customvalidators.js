/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
module.exports = function(validator) {
  validator.attributes.isValidMongoId = function isValidMongoId(instance, schema, options, ctx) {
    var re = /^[0-9a-fA-F]{24}$/;
    console.log(re.test(instance));
    if(!re.test(instance)) {
      return 'Invalid id ' + JSON.stringify(instance);
    }
  }
}