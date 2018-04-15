"use strict";
/**
 * Created by laurence-ho on 21/07/17.
 */
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var db = require('./database/db.service');
var config = require('./config');
var sha1 = require('sha1');
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [id], function (err, rows) {
                    connection.release();
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    else {
                        done(null, rows[0]);
                    }
                });
            }
        });
    });
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        console.log('---- User Signup: ' + username + ' ----');
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [username], function (err, rows) {
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    if (rows.length) {
                        return done(err, false, { message: 'This username is already taken.' });
                    }
                    else {
                        // if there is no user with that username, create the user
                        var newUserMysql_1 = {
                            username: username,
                            password: sha1(password) // use the generateHash function in our user model
                        };
                        var insertQuery = 'INSERT INTO ' + config.db_tables.USERS + ' ( username, password ) values (?,?)';
                        connection.query(insertQuery, [newUserMysql_1.username, newUserMysql_1.password], function (err, rows) {
                            connection.release();
                            if (err) {
                                console.error('error', err);
                                return done(err);
                            }
                            newUserMysql_1 = rows;
                            return done(null, newUserMysql_1);
                        });
                    }
                });
            }
        });
    }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        console.log('---- User login: ' + username + ' ----');
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [username], function (err, rows) {
                    connection.release();
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    if (rows.length) {
                        // if the user is found but the password is wrong
                        if (!(sha1(password) === rows[0].password)) {
                            return done(err, false, { message: 'User name or password is wrong' });
                        }
                        else {
                            // all is well, return successful user
                            return done(null, rows[0]);
                        }
                    }
                    else {
                        return done(err, false, { message: 'User name or password is wrong' });
                    }
                });
            }
        });
    }));
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsaURBQWlEO3dCQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7d0JBQ3RFLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ1Asc0NBQXNDOzRCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztvQkFDRixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7b0JBQ3RFLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6InBhc3Nwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxhdXJlbmNlLWhvIG9uIDIxLzA3LzE3LlxuICovXG5cbmltcG9ydCB7IFBhc3Nwb3J0IH0gZnJvbSAncGFzc3BvcnQnO1xuXG5sZXQgTG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5cbmxldCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQtbm9kZWpzJyk7XG5sZXQgZGIgPSByZXF1aXJlKCcuL2RhdGFiYXNlL2RiLnNlcnZpY2UnKTtcbmxldCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xubGV0IHNoYTEgPSByZXF1aXJlKCdzaGExJyk7XG5cbmV4cG9ydCA9IChwYXNzcG9ydDogUGFzc3BvcnQpID0+IHtcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBwYXNzcG9ydCBzZXNzaW9uIHNldHVwID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gcmVxdWlyZWQgZm9yIHBlcnNpc3RlbnQgbG9naW4gc2Vzc2lvbnNcblx0Ly8gcGFzc3BvcnQgbmVlZHMgYWJpbGl0eSB0byBzZXJpYWxpemUgYW5kIHVuc2VyaWFsaXplIHVzZXJzIG91dCBvZiBzZXNzaW9uXG5cblx0Ly8gdXNlZCB0byBzZXJpYWxpemUgdGhlIHVzZXIgZm9yIHRoZSBzZXNzaW9uXG5cdHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXI6IGFueSwgZG9uZTogYW55KSA9PiB7XG5cdFx0ZG9uZShudWxsLCB1c2VyLnVzZXJuYW1lKTtcblx0fSk7XG5cblx0Ly8gdXNlZCB0byBkZXNlcmlhbGl6ZSB0aGUgdXNlclxuXHRwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoKGlkLCBkb25lKSA9PiB7XG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XG5cdFx0XHRcdHJldHVybiBkb25lKGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NICcrY29uZmlnLmRiX3RhYmxlcy5VU0VSUysnIFdIRVJFIHVzZXJuYW1lID0gPycsIFtpZF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShlcnIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkb25lKG51bGwsIHJvd3NbMF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTE9DQUwgU0lHTlVQID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIHdlIGFyZSB1c2luZyBuYW1lZCBzdHJhdGVnaWVzIHNpbmNlIHdlIGhhdmUgb25lIGZvciBsb2dpbiBhbmQgb25lIGZvciBzaWdudXBcblx0Ly8gYnkgZGVmYXVsdCwgaWYgdGhlcmUgd2FzIG5vIG5hbWUsIGl0IHdvdWxkIGp1c3QgYmUgY2FsbGVkICdsb2NhbCdcblxuXHRwYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsXG5cdFx0bmV3IExvY2FsU3RyYXRlZ3koe1xuXHRcdFx0XHQvLyBieSBkZWZhdWx0LCBsb2NhbCBzdHJhdGVneSB1c2VzIHVzZXJuYW1lIGFuZCBwYXNzd29yZCwgd2Ugd2lsbCBvdmVycmlkZSB3aXRoIGVtYWlsXG5cdFx0XHRcdHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG5cdFx0XHRcdHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG5cdFx0XHRcdHBhc3NSZXFUb0NhbGxiYWNrOiB0cnVlIC8vIGFsbG93cyB1cyB0byBwYXNzIGJhY2sgdGhlIGVudGlyZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFja1xuXHRcdFx0fSxcblx0XHRcdChyZXE6IGFueSwgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZG9uZTogYW55KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tIFVzZXIgU2lnbnVwOiAnICsgdXNlcm5hbWUgKyAnIC0tLS0nKTtcblxuXHRcdFx0XHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSAnK2NvbmZpZy5kYl90YWJsZXMuVVNFUlMrJyBXSEVSRSB1c2VybmFtZSA9ID8nLCBbdXNlcm5hbWVdLCAoZXJyOiBhbnksIHJvd3M6IGFueSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAocm93cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShlcnIsIGZhbHNlLCB7bWVzc2FnZTogJ1RoaXMgdXNlcm5hbWUgaXMgYWxyZWFkeSB0YWtlbi4nfSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gdXNlciB3aXRoIHRoYXQgdXNlcm5hbWUsIGNyZWF0ZSB0aGUgdXNlclxuXHRcdFx0XHRcdFx0XHRcdGxldCBuZXdVc2VyTXlzcWwgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwYXNzd29yZDogc2hhMShwYXNzd29yZCkgLy8gdXNlIHRoZSBnZW5lcmF0ZUhhc2ggZnVuY3Rpb24gaW4gb3VyIHVzZXIgbW9kZWxcblx0XHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGluc2VydFF1ZXJ5ID0gJ0lOU0VSVCBJTlRPICcrY29uZmlnLmRiX3RhYmxlcy5VU0VSUysnICggdXNlcm5hbWUsIHBhc3N3b3JkICkgdmFsdWVzICg/LD8pJztcblxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoaW5zZXJ0UXVlcnksIFtuZXdVc2VyTXlzcWwudXNlcm5hbWUsIG5ld1VzZXJNeXNxbC5wYXNzd29yZF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRuZXdVc2VyTXlzcWwgPSByb3dzO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCBuZXdVc2VyTXlzcWwpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0KTtcblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIExPQ0FMIExPR0lOID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyB3ZSBhcmUgdXNpbmcgbmFtZWQgc3RyYXRlZ2llcyBzaW5jZSB3ZSBoYXZlIG9uZSBmb3IgbG9naW4gYW5kIG9uZSBmb3Igc2lnbnVwXG5cdC8vIGJ5IGRlZmF1bHQsIGlmIHRoZXJlIHdhcyBubyBuYW1lLCBpdCB3b3VsZCBqdXN0IGJlIGNhbGxlZCAnbG9jYWwnXG5cblx0cGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsXG5cdFx0bmV3IExvY2FsU3RyYXRlZ3koe1xuXHRcdFx0XHQvLyBieSBkZWZhdWx0LCBsb2NhbCBzdHJhdGVneSB1c2VzIHVzZXJuYW1lIGFuZCBwYXNzd29yZCwgd2Ugd2lsbCBvdmVycmlkZSB3aXRoIGVtYWlsXG5cdFx0XHRcdHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG5cdFx0XHRcdHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG5cdFx0XHRcdHBhc3NSZXFUb0NhbGxiYWNrOiB0cnVlIC8vIGFsbG93cyB1cyB0byBwYXNzIGJhY2sgdGhlIGVudGlyZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFja1xuXHRcdFx0fSxcblx0XHRcdChyZXE6IGFueSwgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZG9uZTogYW55KSA9PiB7IC8vIGNhbGxiYWNrIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkIGZyb20gb3VyIGZvcm1cblx0XHRcdFx0Y29uc29sZS5sb2coJy0tLS0gVXNlciBsb2dpbjogJyArIHVzZXJuYW1lICsgJyAtLS0tJyk7XG5cblx0XHRcdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVycik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gJytjb25maWcuZGJfdGFibGVzLlVTRVJTKycgV0hFUkUgdXNlcm5hbWUgPSA/JywgW3VzZXJuYW1lXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJvd3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlIHVzZXIgaXMgZm91bmQgYnV0IHRoZSBwYXNzd29yZCBpcyB3cm9uZ1xuXHRcdFx0XHRcdFx0XHRcdGlmICghKHNoYTEocGFzc3dvcmQpID09PSByb3dzWzBdLnBhc3N3b3JkKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyLCBmYWxzZSwge21lc3NhZ2U6ICdVc2VyIG5hbWUgb3IgcGFzc3dvcmQgaXMgd3JvbmcnfSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGFsbCBpcyB3ZWxsLCByZXR1cm4gc3VjY2Vzc2Z1bCB1c2VyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCByb3dzWzBdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyLCBmYWxzZSwge21lc3NhZ2U6ICdVc2VyIG5hbWUgb3IgcGFzc3dvcmQgaXMgd3JvbmcnfSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHQpO1xufTtcbiJdfQ==
