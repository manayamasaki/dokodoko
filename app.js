const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password=${MYSQL_PASSWORD}',
  database: 'bookshelf'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));

// 本棚追加
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));

app.post('/register', (req, res) => {
    const userData = req.body;
    const sql = "INSERT INTO BookshelfUsersInformation SET ?";

    con.query(sql, userData, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('登録に失敗しました');
            return;
        }
        console.log('Inserted:', result);
        res.send('登録が完了しました');
    });
});
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

//本棚リスト
app.get('/', (req, res) => {
	const sql = "select * from BookshelfUsersInformation";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index', { BookshelfUsersInformation: result });
	});
});
//本棚リスト購入済みボタン
app.post('/update-counter/:Id', (req, res) => {
    const bookId = req.params.Id;
    const change = parseInt(req.query.change);
    const sql = "UPDATE BookshelfUsersInformation SET Purchased = Purchased + ? WHERE Id = ?";
    con.query(sql, [change, bookId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('カウンターの更新に失敗しました');
            return;
        }
        console.log('Updated:', result);
        res.sendStatus(200);
    });
});

// 削除機能 
app.get('/delete/:Id',(req,res)=>{
	const sql = "DELETE FROM BookshelfUsersInformation  WHERE Id = ?";
	con.query(sql,[req.params.Id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});
// 編集機能 
app.post('/update/:Id',(req,res)=>{
	const sql = "UPDATE BookshelfUsersInformation  SET ? WHERE Id = " + req.params.Id;
	con.query(sql,req.body,function (err, result, fields) {  
		if (err) throw err;
		console.log(result);
		res.redirect('/');
		});
});

app.get('/edit/:Id',(req,res)=>{
	const sql = "SELECT * FROM BookshelfUsersInformation WHERE Id = ?";
	con.query(sql,[req.params.Id],function (err, result, fields) {  
		if (err) throw err;
		res.render('edit',{BookshelfUsersInformation: result});
		});
});


// サーバーを起動
app.listen(port, () => console.log(`Server is listening on port ${port}`));
