/* 
 * @Author: renjithks
 * @Date:   2015-09-19 16:17:50
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-20 01:17:26
 */

'use strict';

module.exports.updateItemSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "_id": {
      "id": "/_id",
      "type": "string"
    },
    "store_id": {
      "id": "/store_id",
      "type": "string"
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
      "type": "string"
    },
    "description": {
      "id": "/description",
      "type": "string"
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
          "_id": {
            "id": "/_id",
            "type": "string"
          },
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
    "_id",
    "store_id",
    "name",
    "description",
    "tags",
    "variations"
  ]
}
