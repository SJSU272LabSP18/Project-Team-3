/**
 * config
 */
let fs = require('fs');

exports.db_options = {
		connectionLimit: 12,
        host: 'sl-us-south-1-portal.22.dblayer.com',
        port: 39849,
        user: 'admin',
        password: 'YUNVSJBQKEHIOIQJ',
        ssl: {
            ca: fs.readFileSync(__dirname + '/cert/cert.crt')
        },
        database: 'rental',
        charset: 'utf8'
};

exports.db_tables = {
	USERS : 'rental_users'
}


	