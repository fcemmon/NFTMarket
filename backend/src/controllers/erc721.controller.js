const { pool } = require("../mysql/connector");
const Product = require("../db/product.db");
const ERC721 = require("../db/erc721.db");
const { mintERC721 } = require("../actions/mint");

exports.create = (req, res) => {
  let user_id = req.body.userId
  let external_url = req.body.externalUrl
  let description = req.body.description
  let name = req.body.name
  let user_wallet = req.body.userWallet
  let status = "processing"
  let token_type = req.body.tokenType

  ERC721.create(name, description, external_url, (err, result) => {
    if (err) throw err;
    let token_id = result.insertId
    Product.create(user_id, token_id, token_type, status, (pe, pr) => {
      if (pe) throw pe;
      res.send(JSON.stringify({
          status: status
        })
      );
      mintERC721(user_wallet, token_id, pr.insertId)
    })
  })
}

exports.get = (req, res) => {
  let id = req.params.token_id
  ERC721.get(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}

exports.makeSell = (req, res) => {

}

exports.list = (req, res) => {
  ERC721.list((err, result, fields) => {
    var string = JSON.stringify(result);
      res.send(string);
  })
}