const { pool } = require("../mysql/connector");
const Product = require("../db/product.db");
const ERC1155 = require("../db/erc1155.db");
const { mintERC1155 } = require("../actions/mint")

exports.create = (req, res) => {
  let user_id = req.body.userId
  let external_url = req.body.externalUrl
  let description = req.body.description
  let name = req.body.name
  let quantity = req.body.quantity
  let user_wallet = req.body.userWallet
  let status = "processing"
  let token_type = req.body.tokenType

  ERC1155.create(name, description, external_url, quantity, (err, result) => {
    if (err) console.log(err);
    let token_id = result.insertId
    Product.create(user_id, token_id, token_type, status, (pe, pr) => {
	  if (pe) throw pe;
	  res.send(JSON.stringify({
	      status: status
	    })
      );
      mintERC1155(user_wallet, token_id, quantity, description, pr.insertId)
    })
  })
}

exports.get = (req, res) => {
  let id = req.param.token_id
  ERC1155.get(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.makeSell = (req, res) => {

}

exports.list = (req, res) => {
	ERC1155.list((err, result, fields) => {
		var string = JSON.stringify(result);
    	res.send(string);
	})
}