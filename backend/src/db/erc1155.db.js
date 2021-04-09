const { pool } = require("../mysql/connector");

exports.create = (name, description, external_url, quantity, callback) => {
	var sql = "INSERT INTO erc1155s ( name, description, external_url, quantity ) VALUES ('"+name+"', '"+description+"', '"+external_url+"', "+quantity+")";
	pool.query(sql, callback);
}

exports.get = (token_id, callback) => {
	pool.query("SELECT * FROM erc1155s WHERE id = "+ token_id, callback);
}

exports.find = (tokens, callback) => {
	pool.query("SELECT * FROM erc1155s WHERE id IN (" + tokens + ")", callback)
}

exports.list = (callback) => {
	pool.query("SELECT * FROM erc1155s", callback)
}

exports.storeUrl = (url, token_id, callback) => {
	pool.query(`UPDATE erc1155s SET external_url = '${url}' WHERE id = ${token_id}`, callback);
}