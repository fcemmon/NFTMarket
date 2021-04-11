const { pool } = require("../mysql/connector");
const Product = require("../db/product.db");
const ERC721 = require("../db/erc721.db");

exports.get = (req, res) => {
  let id = req.params.token_id
  ERC721.get(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}