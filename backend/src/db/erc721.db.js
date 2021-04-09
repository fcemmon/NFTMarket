const { pool } = require("../mysql/connector");

exports.create = (name, description, external_url, callback) => {
	var sql = "INSERT INTO erc721s ( name, description, external_url ) VALUES ('"+name+"', '"+description+"', '"+external_url+"')";
	pool.query(sql, callback);
}

exports.get = (token_id, callback) => {
	pool.query("SELECT * FROM erc721s WHERE id = "+ token_id, callback);
}

exports.find = (tokens, callback) => {
	pool.query("SELECT * FROM erc721s WHERE id IN (" + tokens + ")")
}

exports.list = (callback) => {
	pool.query("SELECT * FROM erc721s", callback)
}

exports.storeUrl = (url, token_id, callback) => {
	pool.query(`UPDATE erc721s SET external_url = '${url}' WHERE id = ${token_id}`, callback);
}