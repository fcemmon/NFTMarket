const { sell } = require("../actions/sell");
const { balance } = require("../actions/manage")
const Product = require("../db/product.db")

exports.publish = (req, res) => {
	const product_id = req.params.product_id
	const type = req.body.type
	const address = req.body.address
	
	Product.getById(product_id, (err, result, field) => {
		if (err) throw err
		if (result.length)
		{
			const product = result[0]
			sell(product_id, product.token_id, address, type)
			res.send("processing")
		} else {
			res.setStatus(404).send("not found");
		}
	})
}

exports.view = (req, res) => {
	Product.get(product_id, (err, result, field) => {
		if (err) throw err
		if (result.length)
		{
			const product = result[0]
			const token_id = req.params.token_id
			const type = req.query.type
			const address = req.query.address
		} else {
			res.setStatus(404).send("not found");
		}
	})
}