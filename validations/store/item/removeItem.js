/* 
 * @Author: renjithks
 * @Date:   2015-09-20 18:39:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-20 18:40:57
 */

'use strict';

module.exports.removeItemSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "_id": {
      "id": "_id",
      "type": "string",
      "isValidMongoId": null
    },
    "store_id": {
      "id": "store_id",
      "type": "string",
      "isValidMongoId": null,
      "isValidStoreId": null
    }
  },
  "required": [
    "_id",
    "store_id"
  ]
}
