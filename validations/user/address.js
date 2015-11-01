/* 
 * @Author: renjithks
 * @Date:   2015-08-18 22:18:05
 * @Last Modified by:   Renjith Sasidharan
 * @Last Modified time: 2015-09-27 16:47:20
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
      "minimum": -90,
      "maximum": 90
    },
    "longitude": {
      "id": "/longitude",
      "type": "number",
      "minimum": -180,
      "maximum": 180
    }
  },
  "required": ["latitude", "longitude"]
}
