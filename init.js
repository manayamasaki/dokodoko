//多分mysqlのクエリを実行してる
var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'root',
    password: 'umebayasi33'
});
connection.query('CREATE DATABASE test', function (err) {
    if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
        throw err;
    }
});
connection.query('USE test');
connection.query(
    'CREATE TABLE user ' +
    '(id INT AUTO_INCREMENT, ' +
    'name VARCHAR(100) UNIQUE NOT NULL, ' +
    'pass VARCHAR(100) NOT NULL, ' +
    'PRIMARY KEY (id));'
);
connection.end();