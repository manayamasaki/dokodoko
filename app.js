//app.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');
const config = require('./config');

require('dotenv').config();
const cors = require('cors'); //CORS(Cross-Origin Resource Sharing)を有効にする
const morgan = require('morgan'); //HTTPレクエストロガー
const helmet = require('helmet');

const app = express();
const port = 3001;

const pool = new Pool(config);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));


function create(name, pass, res) {
    pool.query(
        `INSERT INTO "users" (name, pass) VALUES ($1, $2)`, 
        [name, pass],
        (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                res.redirect('auth.ejs?msg=作成エラー！');
            } else {
                console.log('User created successfully');
                //res.redirect('auth.ejs?msg=作成OK！');
            }
        }
    );
}

// ユーザー認証
function auth(req, name, pass, res) {
    pool.query(
        `SELECT name FROM "users" WHERE name = $1 AND pass = $2`,
        [name, pass],
        (err, result) => {
            if (err || result.rows.length === 0) {
                console.error('Authentication failed:', err);
                // res オブジェクトが定義されていることを確認してからリダイレクトする
                if (res) {
                    res.redirect('auth.ejs?msg=認証エラー！');
                } else {
                    console.error('res オブジェクトが未定義です。');
                }
            } else {
                console.log('Authentication successful');
                // ユーザーが認証成功した場合、セッションに loginid を保存する
                req.session.loginid = name;
                // res オブジェクトが定義されていることを確認してからリダイレクトする
                if (res) {
                    res.redirect(`user/${name}`);
                } else {
                    console.error('res オブジェクトが未定義です。');
                }
            }
        }
    );
}

app.post('/auth', (req, res) => {
    const { name, pass } = req.body;
    // auth 関数に req も渡して呼び出す
    auth(req, name, pass, res);
});


app.get('/', (req, res) => {
    res.send("サーバー実行中");
});

app.get('/create.ejs', (req, res) => {
    res.render('create.ejs');
});

app.get('/auth.ejs', (req, res) => {
    res.render('auth.ejs');
});

app.post('/create', (req, res) => {
    const { name, pass } = req.body;
    create(name, pass, res);
});

app.post('/auth', (req, res) => {
    const { name, pass } = req.body;
    auth(name, pass, res);
});

// 本棚追加
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.post('/register', async (req, res) => {
    try {
        const regiloginid = req.session.loginid;
        const userData = req.body;
        const sql = "INSERT INTO bookshelf (loginid, title, purchased) VALUES ($1, $2, $3)";
        const values = [regiloginid, userData.title, userData.purchased];
        await pool.query(sql, values);
        res.send('登録が完了しました');
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).send('登録に失敗しました');
    }
});


// 本棚リスト
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/user/:loginid', async (req, res) => {
    try {
        const userid = req.params.loginid;
        req.session.userid = userid;
        const sql = "SELECT * FROM bookshelf WHERE loginid = $1 AND loginid IS NOT NULL ORDER BY title";
        const result = await pool.query(sql, [userid]);
        res.render('index', { bookshelf: result.rows });
    } catch (error) {
        console.error('Error fetching bookshelf:', error);
        res.status(500).send('本棚の取得に失敗しました');
    }
});

// 本棚リスト購入済みボタン
app.post('/update-counter/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const change = parseInt(req.query.change);
        const sql = "UPDATE bookshelf SET purchased = purchased + $1 WHERE id = $2";
        await pool.query(sql, [change, bookId]);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to update counter:', error);
        res.status(500).send('カウンターの更新に失敗しました');
    }
});

// 削除機能
app.get('/delete/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const sql = "DELETE FROM bookshelf WHERE id = $1";
        await pool.query(sql, [bookId]);
        res.redirect('/user/' + req.session.loginid);
    } catch (error) {
        console.error('Deletion failed:', error);
        res.status(500).send('削除に失敗しました');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;