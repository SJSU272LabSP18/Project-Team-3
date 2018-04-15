/**
 * Created by laurence-ho on 21/07/17.
 */

const db = require('./database/db.service');
let config = require('./config');
let authentication: any = {};

authentication.checkAdmin = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		db.getConnection((err: any, connection: any) => {
			if (err) {
				res.status(500).send({message: err});
			} else {
				connection.query('SELECT * FROM '+config.db_tables.USERS+' WHERE username = ?', [req.params.username], (err: any, rows: any) => {
					connection.release();

					if (err) {
						res.status(500).send({message: err});
					} else {
						if (rows[0].level >= 11) {
							next();
						} else {
							res.status(403).send({message: 'You have no permission'});
						}
					}
				});
			}
		});
	} else {
		res.status(403).send({message: 'Please Login First'});
	}
};

authentication.checkManager = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		db.getConnection((err: any, connection: any) => {
			if (err) {
				res.status(500).send({message: err});
			} else {
				connection.query('SELECT * FROM '+config.db_tables.USERS+' WHERE username = ?', [req.params.username], (err: any, rows: any) => {
					connection.release();

					if (err) {
						res.status(500).send({message: err});
					} else {
						if (rows[0].level >= 5) {
							next();
						} else {
							res.status(403).send({message: 'You have no permission'});
						}
					}
				});
			}
		});
	} else {
		res.status(403).send({message: 'Please Login First'});
	}
};

authentication.isLoggedIn = (req: any, res: any, next: any) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(403).send({message: 'Please Login First'});
};

export = authentication;

