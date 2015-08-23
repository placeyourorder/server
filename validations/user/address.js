/* 
 * @Author: renjithks
 * @Date:   2015-08-18 22:18:05
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-18 23:21:05
 */

'use strict';

module.exports.addressCreateSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "",
  "type": "object",
  "properties": {
    "address1": {
      "id": "/address1",
      "type": "string",
    },
    "address2": {
      "id": "/address2",
      "type": "string",
    },
    "address3": {
      "id": "/address3",
      "type": "string",
    },
    "city": {
      "id": "/city",
      "type": "string",
    },
    "latitude": {
      "id": "/latitude",
      "type": "number",
    },
    "longitude": {
      "id": "/longitude",
      "type": "number",
    }
  },
  "required": ["latitude", "longitude"]
}