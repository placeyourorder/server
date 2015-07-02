/* 
* @Author: renjithks
* @Date:   2015-06-12 22:08:35
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-03 00:12:53
*/
exports.isValidMongoIdScehma = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "id": {
      "id": "/id",
      "type": "string",
      "isValidMongoId":null
    }
  },
  "required": [
    "id"
  ]
}