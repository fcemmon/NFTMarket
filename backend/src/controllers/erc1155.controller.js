const { pool } = require("../mysql/connector");
const Product = require("../db/product.db");
const ERC1155 = require("../db/erc1155.db");

exports.get = (req, res) => {
  let id = req.param.token_id
  ERC1155.get(id, (err, result, fields) => {
    if (err) throw err;
    var string = JSON.stringify(result);
    res.send(string);
  })
}