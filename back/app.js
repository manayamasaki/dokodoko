const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mysql = require('mysql');

// MySQL接続の設定
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password=${MYSQL_PASSWORD}',
  database: 'bookshelf'
});

// MySQLに接続
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Expressの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // JSON パーサーを使用

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// 本棚追加のPOSTリクエスト
app.post('/register', (req, res) => {
    // リクエストボディからデータを取得
    const { title, purchased, released } = req.body;
    
    // データベースに挿入するデータオブジェクトを作成
    const userData = { title, purchased, released };

    // データベースに挿入するSQLクエリ
    const sql = "INSERT INTO BookshelfUsersInformation SET ?";
    
    // SQLクエリの実行
    con.query(sql, userData, function(err, result) {
        if (err) {
            console.error(err);
            // エラーが発生した場合は500エラーをクライアントに送信
            res.status(500).send('登録に失敗しました');
            return;
        }
        console.log('Inserted:', result);
        // 登録が成功した場合は成功メッセージをクライアントに送信
        res.json({ message: '登録が完了しました' }); // データをJSON形式でクライアントに返す
    });
});


// 本棚リストの取得
app.get('/register', (req, res) => {
    const sql = "SELECT * FROM BookshelfUsersInformation";
    con.query(sql, function (err, result, fields) {  
        if (err) {
            console.error(err);
            res.status(500).send('データの取得に失敗しました');
            return;
        }
        res.json(result); // データをJSON形式でクライアントに返す
    });
});

// その他のリクエスト（カウンター更新、削除、編集）は省略

// サーバーを起動
app.listen(port, () => console.log(`Server is listening on port ${port}`));
