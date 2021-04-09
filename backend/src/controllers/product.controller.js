const { pool } = require("../mysql/connector");
const Product = require("../db/product.db")
const ERC721 = require("../db/erc721.db")
const ERC1155 = require("../db/erc1155.db")

exports.list = (req, res) => {
	let user_id = req.params.userId
	Product.list(user_id, (err, result, fields) => {
		if (err) throw err;
		const erc721Tokens = []
		const erc1155Tokens = []
		for (var i = 0; i < result.length; i ++) {
			const product = result[i]
			if (product.token_type === "erc721")
				erc721Tokens.push(`'${product.token_id}'`)
			else 
				erc1155Tokens.push(`'${product.token_id}'`)
		}
		const erc721Tokens_st = erc721Tokens.join(", ")
		const erc1155Tokens_st = erc1155Tokens.join(", ")

		var exportResult = []

		ERC721.find(erc721Tokens_st, (erc721Err, erc721Result, erc721Fields) => {
			if (erc721Result)
					exportResult.push([ ...erc721Result ])
			ERC1155.find(erc1155Tokens_st, (erc1155Err, erc1155Result, erc1155Fields) => {
				if (erc1155Result)
					exportResult.push([ ...erc1155Result ])

				var string = JSON.stringify(exportResult);
				res.send(string);
			})
		})
	})
}

exports.removeAll = (req, res) => {
	Product.removeAll((err, result, fields) => {
	    if (err) throw err;
	    var string = JSON.stringify(result);
	    res.send(string);
	})
}

exports.get = (req, res) => {
  let id = req.params.product_id
  Product.getById(id, (err, result, fields) => {
  	if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.update = (req, res) => {
  let id = req.params.product_id
  let token_id = req.body.token_id
  
  Product.updateId(id, token_id, (err, results, fields) => {
  	if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.remove = (req, res) => {
  let id = req.params.product_id
  Product.remove(id, (err, result, fields) => {
  	if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}