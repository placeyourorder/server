module.exports = function(validator) {
  validator.attributes.isValidMongoId = function isValidMongoId(instance, schema, options, ctx) {
    var re = /^[0-9a-fA-F]{24}$/;
    console.log(re.test(instance));
    if(!re.test(instance)) {
      return 'Invalid id ' + JSON.stringify(instance);
    }
  }
}