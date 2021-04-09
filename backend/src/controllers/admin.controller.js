const { pool } = require("../mysql/connector");

exports.create = (req, res) => {
  res.end('Installing');

  var sql = "CREATE TABLE erc721s ( id int(10) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), external_url VARCHAR(255), description VARCHAR(255) )";
  pool.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Table created");
  });

  sql = "CREATE TABLE erc1155s ( id int(10) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), external_url VARCHAR(255), description VARCHAR(255), quantity int )";
  pool.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Table created");
  });

  sql = "CREATE TABLE users ( id int(10) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), nonce VARCHAR(255) )";
  pool.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Table created");
  });

  sql = "CREATE TABLE products ( id int(10) AUTO_INCREMENT PRIMARY KEY, user_id int(10), token_id int(10), token_type VARCHAR(10), status VARCHAR(10) )";
  pool.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Table created");
  });
}