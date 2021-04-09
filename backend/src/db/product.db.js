const { pool } = require("../mysql/connector");

exports.create = (user_id, token_id, token_type, status, callback) => {
	var sql = "INSERT INTO products ( user_id, token_id, token_type, status ) VALUES ("+user_id+", "+token_id+", '"+token_type+"', '"+status+"' )";
	pool.query(sql, callback);
}

exports.getById = (product_id, callback) => {
	pool.query("SELECT * FROM products WHERE id = "+ id, callback);
}

exports.list = (userId, callback) => {
	pool.query("SELECT * FROM products WHERE user_id = " + user_id, callback);
}

exports.removeAll = (callback) => {
	pool.query("DELETE FROM products", callback);
}

exports.updateId = (id, token_id, callback) => {
	pool.query(`UPDATE products SET token_id = ${token_id} WHERE id = ${id}`, callback);
}

exports.updateStatus = (id, status, callback) => {
	pool.query(`UPDATE products SET status = '${status}' WHERE id = ${id}`, callback);
}

exports.remove = (id, callback) => {
	pool.query(`DELETE FROM products WHERE id = ${id}`, callback);
}