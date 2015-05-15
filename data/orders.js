var orders = [
	{
		"store_id": "553b75045a692a49c541c843",
		"address": {
			"address1": "Address 3",
			"address2": "Address Lane 3",
			"city": "Bangalore",
			"state":"KA",
      "country": "IN",
			"zipcode": "560103"
		},
		"phone":937459437,
		"line_items": [{
			"id": "32847jdfh823y8789",
			"quantity": 2,
			"unit_price": 45
		},
		{
			"id": "734u743yfd7y87",
			"quantity": 4,
			"unit_price": 4
		}]
	},
	{
		"store_id": "553b75045a692a49c541c843",
		"status": "delivered",
		"authorization_status": "CAPTURED",
		"total_price": 57,
		"address": {
			"address1": "Address 234",
			"address2": "Address Lane 443",
			"city": "Bangalore",
			"state":"KA",
      "country": "IN",
			"zipcode": "560103"
		},
		"phone":937459437,
		"line_items": [{
			"item_id": "3982UEFDGFSJDGF834",
			"quantity": 1,
			"unit_price": 67,
			"total_price": 34
		},
		{
			"item_id": "734u743yfd7y87",
			"quantity": 4,
			"unit_price": 3,
			"total_price": 16
		}]
	}
]

module.exports = orders;