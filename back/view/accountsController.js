//データ取得？
const getData = (req, res, db) => {
    db.select('*').from('users')
        .then(items => {
            if (items.length) {
                res.json(items);
            } else {
                res.json({
                    dataExists: 'false'
                });
            }
        })
        .catch(err => res.status(400).json({
            dbError: 'error'
        }));
}

//データ挿入
const postData = (req, res, db) => {
    const { name, pass } = req.body;
    db('users')
        .insert({ name, pass })
        .returning("*")
        .then(item => {
            res.json(item);
        })
        .catch(err => res.status(400).json({
            dbError: 'error'
        }));
}

//データ更新？
const putData = (req, res, db) => {
    const { name, pass } = req.body;
    db('users').where({ name }).update({ pass })
        .returning('*')
        .then(item => {
            res.json(item);
        })
        .catch(err => res.status(400).json({
            dbError: 'error'
        }));
}

//データ削除
const delData = (req, res, db) => {
    const { name } = req.body;
    db('users').where({ name }).del()
        .then(() => {
            res.json({
                delete: 'true'
            });
        })
        .catch(err => res.status(400).json({
            dbError: 'error'
        }));
}

module.exports = {
    getData,
    postData,
    putData,
    delData
}
