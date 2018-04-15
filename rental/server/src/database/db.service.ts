import mysql = require('mysql');
let config = require('../config');

const db = (() => {
	this.pool = mysql.createPool(config.db_options);

	this.getConnection = (cb: any) => {
		this.pool.getConnection(cb);
	};

	this.query = (sql: any, values: any) => new Promise((resolve, reject) => {
		this.pool.getConnection((err: any, connection: any) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(sql, values, (err: any, results: any) => {
					connection.release();

					if (err) {
						console.log(err);
					} else {
						resolve(results);
					}
				});
			}
		});
	});

	return this;
})();

export = db;