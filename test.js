var { render } = require('ejs');
var express = require('express');
var test = express();

test.get('/', (req, res) => {
    res.render('menu.ejs');
});
test.get('/create.ejs', (req, res) => {
    res.render('create.ejs');
});
test.get('/auth.ejs', (req, res) => {
    res.render('auth.ejs');
});
test.listen(3000);


test.post('/create', (req, res) => {
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {
        create(data.split('&'));
        setTimeout(function () {
                res.redirect('auth.ejs?msg=作成OK！');
        }, 1000);
    })
});

var flg = false;
test.post('/auth', (req, res) => {
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {
        auth(data.split('&'));
        setTimeout(function () {
            if (flg) {
                res.redirect('auth.ejs?msg=認証OK！');
            } else {
                res.redirect('auth.ejs');
            }
        }, 1000);
    })
});

// ユーザー登録
function create (param) {
    var name = param[0].split('=')[1];
    var pass = param[1].split('=')[1];

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        user: 'root',
        password: 'umebayasi33'
    });
    connection.query('USE test');
    connection.query(
        'INSERT INTO user (name, pass) VALUES ("' +
        name +
        '", "' +
        pass +
        '");'
    );
    connection.end();
    return;
}

// ユーザー認証
function auth (param) {
    var name = param[0].split('=')[1];
    var pass = param[1].split('=')[1];

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        user: 'root',
        password: 'umebayasi33'
    });
    connection.query('USE test');
    connection.query(
        'SELECT name FROM user WHERE name = "' +
        name +
        '" AND pass = "' +
        pass +
        '";'
    , function (err, result, fields) {
        if (err || !result || result.length == 0 || result.affectedRows == 0 || !result[0] || !result[0].name || result[0].name != name) {
            flg = false;
            return;
        }
    });
    connection.end();
    flg = true;
    return;
}