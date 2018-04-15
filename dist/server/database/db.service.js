"use strict";
var _this = this;
var mysql = require("mysql");
var config = require('../config');
var db = (function () {
    _this.pool = mysql.createPool(config.db_options);
    _this.getConnection = function (cb) {
        _this.pool.getConnection(cb);
    };
    _this.query = function (sql, values) { return new Promise(function (resolve, reject) {
        _this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(sql, values, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        });
    }); };
    return _this;
})();
module.exports = db;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFiYXNlL2RiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQStCWTtBQS9CWiw2QkFBZ0M7QUFDaEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWxDLElBQU0sRUFBRSxHQUFHLENBQUM7SUFDWCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxFQUFPO1FBQzVCLEtBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBQyxHQUFRLEVBQUUsTUFBVyxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNuRSxLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFDLEdBQVEsRUFBRSxVQUFlO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQUMsR0FBUSxFQUFFLE9BQVk7b0JBQ3BELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFckIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxFQWhCc0MsQ0FnQnRDLENBQUM7SUFFSCxNQUFNLENBQUMsS0FBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLGlCQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJkYXRhYmFzZS9kYi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG15c3FsID0gcmVxdWlyZSgnbXlzcWwnKTtcbmxldCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuY29uc3QgZGIgPSAoKCkgPT4ge1xuXHR0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKGNvbmZpZy5kYl9vcHRpb25zKTtcblxuXHR0aGlzLmdldENvbm5lY3Rpb24gPSAoY2I6IGFueSkgPT4ge1xuXHRcdHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGNiKTtcblx0fTtcblxuXHR0aGlzLnF1ZXJ5ID0gKHNxbDogYW55LCB2YWx1ZXM6IGFueSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNxbCwgdmFsdWVzLCAoZXJyOiBhbnksIHJlc3VsdHM6IGFueSkgPT4ge1xuXHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbmV4cG9ydCA9IGRiOyJdfQ==
