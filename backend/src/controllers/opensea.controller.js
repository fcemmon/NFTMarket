const { sell } = require("../actions/sell");
const { balance } = require("../actions/manage")

exports.publish = (req, res) => {
	const token_id = req.params.token_id
	const type = req.body.type
	const address = req.body.address

	sell(token_id, address, type)

	res.send("processing")
}

exports.view = (req, res) => {
	const token_id = req.params.token_id
	const type = req.query.type
	const address = req.query.address
}