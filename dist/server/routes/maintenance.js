"use strict";
var express = require("express");
var router = express.Router();
var config = require('../config');
var db = require('../database/db.service');
var authentication = require('../authentication');
router.post('/maintenance', function (req, res) {
    //req.isAuthenticated()
    if (true) {
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return res.send(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.RENTAL_MAINTENANCE + ' WHERE userid = ? AND type= ? AND location= ?', [req.body.id, req.body.type, req.body.location], function (err, rows) {
                    if (err) {
                        console.error('error', err);
                        return res.send(err);
                    }
                    if (rows.length > 0) {
                        //update db with the repeated value
                        var updateMysql = {
                            userid: parseInt(req.body.id),
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var updateQuery = 'UPDATE  ' + config.db_tables.RENTAL_MAINTENANCE + ' set repeated= true';
                        connection.query(updateQuery, [], function (err, rows) {
                            //connection.release();
                            if (err) {
                                connection.release();
                                return res.status(500).send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE;
                            connection.query(selectQuery, [], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                        });
                    }
                    else {
                        // if there is no user with that username, create the user
                        var newUserMysql_1 = {
                            userid: parseInt(req.body.id),
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var insertQuery = 'INSERT INTO ' + config.db_tables.RENTAL_MAINTENANCE + ' (userid, type, location, repeated, description, cost ) values (?,?,?,?,?,?)';
                        connection.query(insertQuery, [newUserMysql_1.userid, newUserMysql_1.type, newUserMysql_1.location, false, newUserMysql_1.description, newUserMysql_1.cost], function (err, rows) {
                            connection.release();
                            if (err) {
                                console.error('error', err);
                                return res.send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE + ' where type=';
                            '+newUserMysql.type+';
                            ' && location=';
                            '+newUserMysql.location+';
                            ' && userid=';
                            '+newUserMysql.userid+';
                            '';
                            connection.query(selectQuery, [], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                            return res.status(200).send(newUserMysql_1);
                        });
                    }
                });
            }
        });
    }
    //res.status(200).json();
});
module.exports = router;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxDQUFDLENBQUM7b0JBQ0osQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCx5QkFBeUI7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQkFBUyxNQUFNLENBQUMiLCJmaWxlIjoicm91dGVzL21haW50ZW5hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJylcclxubGV0IGRiID0gcmVxdWlyZSgnLi4vZGF0YWJhc2UvZGIuc2VydmljZScpO1xyXG5jb25zdCBhdXRoZW50aWNhdGlvbiA9IHJlcXVpcmUoJy4uL2F1dGhlbnRpY2F0aW9uJyk7XHJcblxyXG5cclxuXHJcbnJvdXRlci5wb3N0KCcvbWFpbnRlbmFuY2UnLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbi8vcmVxLmlzQXV0aGVudGljYXRlZCgpXHJcblx0aWYodHJ1ZSkge1xyXG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXMuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSAnK2NvbmZpZy5kYl90YWJsZXMuUkVOVEFMX01BSU5URU5BTkNFKycgV0hFUkUgdXNlcmlkID0gPyBBTkQgdHlwZT0gPyBBTkQgbG9jYXRpb249ID8nLCBbcmVxLmJvZHkuaWQsIHJlcS5ib2R5LnR5cGUsIHJlcS5ib2R5LmxvY2F0aW9uXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnNlbmQoZXJyKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBkYiB3aXRoIHRoZSByZXBlYXRlZCB2YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdGxldCB1cGRhdGVNeXNxbCA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dXNlcmlkOiBwYXJzZUludChyZXEuYm9keS5pZCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IHJlcS5ib2R5LnR5cGUsIC8vIHVzZSB0aGUgZ2VuZXJhdGVIYXNoIGZ1bmN0aW9uIGluIG91ciBcclxuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IHJlcS5ib2R5LmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogcmVxLmJvZHkuZGVzY3JpcHRpb24gfHwgJ2RlZmF1bHQgZGVzYycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvc3Q6IGNvbmZpZy5tYWludGVuYW5jZV9jb3N0W3JlcS5ib2R5LnR5cGUrXCJfXCIrcmVxLmJvZHkubG9jYXRpb25dIHx8IDEwMFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUXVlcnkgPSAnVVBEQVRFICAnK2NvbmZpZy5kYl90YWJsZXMuUkVOVEFMX01BSU5URU5BTkNFKycgc2V0IHJlcGVhdGVkPSB0cnVlJztcclxuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHVwZGF0ZVF1ZXJ5LCBbXSwoZXJyOiBhbnksIHJvd3M6IGFueSk9PntcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvL2Nvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIGZyb20gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRTsgXHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNlbGVjdFF1ZXJ5LFtdLChlcnI6IGFueSwgcm93czogYW55KT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZihlcnIpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChyb3dzKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH0pOyBcclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZSwgY3JlYXRlIHRoZSB1c2VyXHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgbmV3VXNlck15c3FsID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VyaWQ6IHBhcnNlSW50KHJlcS5ib2R5LmlkKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogcmVxLmJvZHkudHlwZSwgLy8gdXNlIHRoZSBnZW5lcmF0ZUhhc2ggZnVuY3Rpb24gaW4gb3VyIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbjogcmVxLmJvZHkubG9jYXRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiByZXEuYm9keS5kZXNjcmlwdGlvbiB8fCAnZGVmYXVsdCBkZXNjJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29zdDogY29uZmlnLm1haW50ZW5hbmNlX2Nvc3RbcmVxLmJvZHkudHlwZStcIl9cIityZXEuYm9keS5sb2NhdGlvbl0gfHwgMTAwXHJcblx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGxldCBpbnNlcnRRdWVyeSA9ICdJTlNFUlQgSU5UTyAnK2NvbmZpZy5kYl90YWJsZXMuUkVOVEFMX01BSU5URU5BTkNFKycgKHVzZXJpZCwgdHlwZSwgbG9jYXRpb24sIHJlcGVhdGVkLCBkZXNjcmlwdGlvbiwgY29zdCApIHZhbHVlcyAoPyw/LD8sPyw/LD8pJzsgXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeShpbnNlcnRRdWVyeSwgW25ld1VzZXJNeXNxbC51c2VyaWQsIG5ld1VzZXJNeXNxbC50eXBlLCBuZXdVc2VyTXlzcWwubG9jYXRpb24sIGZhbHNlLCBuZXdVc2VyTXlzcWwuZGVzY3JpcHRpb24sIG5ld1VzZXJNeXNxbC5jb3N0IF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0UXVlcnkgPSAnU0VMRUNUICogZnJvbSAnK2NvbmZpZy5kYl90YWJsZXMuUkVOVEFMX01BSU5URU5BTkNFKycgd2hlcmUgdHlwZT0nJytuZXdVc2VyTXlzcWwudHlwZSsnJyAmJiBsb2NhdGlvbj0nJytuZXdVc2VyTXlzcWwubG9jYXRpb24rJycgJiYgdXNlcmlkPScnK25ld1VzZXJNeXNxbC51c2VyaWQrJycnOyBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeShzZWxlY3RRdWVyeSxbXSwoZXJyOiBhbnksIHJvd3M6IGFueSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocm93cyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKG5ld1VzZXJNeXNxbCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdH1cclxuXHQvL3Jlcy5zdGF0dXMoMjAwKS5qc29uKCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0ID0gcm91dGVyO1xyXG4iXX0=
