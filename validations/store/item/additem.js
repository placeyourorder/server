/* 
* @Author: renjithks
* @Date:   2015-09-20 17:37:27
* @Last Modified by:   renjithks
* @Last Modified time: 2015-09-20 17:42:11
*/

'use strict';

module.exports.addItemSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "store_id": {
      "id": "/store_id",
      "type": "string",
      "isValidMongoId":null,
      "isValidStoreId":null
    },
    "item_id": {
      "id": "/item_id",
      "type": "string"
    },
    "sku": {
      "id": "/sku",
      "type": "string"
    },
    "name": {
      "id": "/name",
      "type": "string",
      "maxLength": 128,
      "minLength": 2
    },
    "description": {
      "id": "/description",
      "type": "string",
      "maxLength": 512,
      "minLength": 2
    },
    "tags": {
      "id": "tags",
      "type": "array",
      'minItems': 1,
      "uniqueItems" : true,
      "items": {
        "id": "tags",
        "type": "string",
        "minLength": 1
      }
    },
    "variations": {
      "id": "variations",
      "type": "array",
      'minItems': 1,
      "items": {
        "id": "variations",
        "type": "object",
        "properties": {
          "sku": {
            "id": "/variations/0/sku",
            "type": "string"
          },
          "quantity": {
            "id": "variations/quantity",
            "type": "number",
            "minimum": 0
          },
          "uom": {
            "id": "/variations/0/uom",
            "type": "string"
          },
          "price": {
            "id": "variations/price",
            "type": "number",
            "minimum": 0,
            "maximum": 9999
          }
        },
        "required": ["quantity", "price", "uom"]
      }
    }
  },
  "required": [
    "store_id",
    "name",
    "description",
    "tags",
    "variations"
  ]
}
