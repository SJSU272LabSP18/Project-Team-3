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
	USERS : 'rental_users',
    RENTAL_MAINTENANCE: 'rental_maintenance'
};

exports.maintenance_cost  = {
    Electrical_Bedroom : 202,
    electrical_kitchen : 25,
    heating_bedroom : 201,
    heating_kitchen : 205,
    aircondition_kitchen : 209,
    aircondition_bedroom : 210
}


	