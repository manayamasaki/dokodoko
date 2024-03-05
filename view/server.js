const express = require('express');
const app = express();
const accountsController = require('./controllers/accountsController'); //dbクエリ
require('dotenv').config();

//ミドルウェアを設定する
const cors = require('cors'); //CORS(Cross-Origin Resource Sharing)を有効にする
const bodyParser = require('body-parser'); //レスポンスのフォーマットを変換する
const morgan = require('morgan'); //HTTPレクエストロガー
const helmet = require('helmet'); //Cross-Site-Scripting(XSS)のような攻撃を防ぐ、参考に：https://www.geeksforgeeks.org/node-js-securing-apps-with-helmet-js/

// knexを使ってdbに接続する
var db = require('knex')({
    client: 'pg',
    connection: {
        host: 'dpg-cna9ladjm4es73c792ug-a.singapore-postgres.render.com',
        user: 'umeba',
        password: 'IyVwHPcpnQDdqFVf460Qup10onpwyuN2',
        database: 'mydb_tj0i',

        ssl: {
            rejectUnauthorized: false,
          },
          max: 10,
    }
    
});

//ミドルウェア
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

//ルーター
app.get('/', (req, res) => res.send('サーバーが実行中です!'));
app.get('/get', (req, res) => accountsController.getData(req, res, db));
app.post('/post', (req, res) => {
    accountsController.postData(req, res, db);
});
app.put('/put', (req, res) => accountsController.putData(req, res, db));
app.delete('/delete', (req, res) => accountsController.delData(req, res, db));

//サーバ接続
app.listen(process.env.PORT || 3001, () => {
    console.log(`port ${process.env.PORT || 3001}`);
});
